import React, { useState } from "react";
import { useStepper } from "../../context/StepperContext";

export const Step16_WithdrawalFee = () => {
	const { prevStep, setIsCompleted } = useStepper();
	const [modalOpen, setModalOpen] = useState(true);

	const handleUnderstand = () => {
		setModalOpen(false);
		setIsCompleted(true);
	};

	return (
		<div className="step16-root">
			<style>{`

    .step16-root{--bg:#01050f;--panel:#071332;--blue:#2d55ac;--muted:#8794b1;--text:#f0f3fb;--gold:#ffd45b}
    *{box-sizing:border-box} .step16-root{margin:0;min-height:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
    .step16-root{min-height:100vh;background:radial-gradient(circle at 85% 0%,rgba(69,0,33,.3),transparent 35%),radial-gradient(circle at 0% 0%,rgba(0,35,79,.24),transparent 38%),var(--bg);overflow:hidden}
    .page{width:100%;min-height:100vh;filter:brightness(.48);padding-top:39px}.content{width:370px;margin:0 auto}
    .heading{display:flex;align-items:center;gap:20px;font-size:25px;font-weight:750;color:#a7afc0}.back{font-size:34px;font-weight:300;line-height:1;color:#748096}
    .balance{margin-top:21px;border:1px solid #121b2e;border-radius:21px;padding:20px;background:rgba(7,12,25,.55);height:160px}.label{font-size:12px;color:#65718a}.amount{font-size:28px;font-weight:750;margin-top:7px;color:#163a91}
    .shade{position:fixed;inset:0;background:rgba(0,0,0,.34)}
    .modal{position:fixed;left:50%;top:162px;transform:translateX(-50%);width:404px;min-height:363px;padding:22px;border-radius:19px;background:linear-gradient(135deg,#08163a,#07112f);box-shadow:0 20px 70px rgba(0,0,0,.45)}
    .close{position:absolute;right:16px;top:12px;border:0;background:none;color:#aeb9d0;font-size:27px;font-weight:200;cursor:pointer}.modal h1{text-align:center;font-size:18px;margin:0 0 17px;font-weight:800}.copy{font-size:13px;line-height:1.35;color:#d0d6e5;font-weight:600;margin:0 0 15px}.fee{height:46px;border:1px solid #806d37;border-radius:15px;display:flex;align-items:center;padding:0 14px;color:var(--gold);font-size:14px;font-weight:800;margin-bottom:17px}.help{font-size:13px;font-weight:750;margin-bottom:10px}.chat{height:42px;width:100%;border-radius:14px;border:1px solid #96542f;background:linear-gradient(180deg,#9d263d,#101d58 86%);color:white;font-size:13px;font-weight:800;cursor:pointer}.bubble{display:inline-block;width:14px;height:12px;border:1.5px solid white;border-radius:50%;vertical-align:-2px;margin-right:7px;position:relative}.bubble:after{content:"";position:absolute;bottom:-4px;left:1px;border-width:3px 3px 0 0;border-style:solid;border-color:white transparent transparent transparent}.note{font-size:11px;line-height:1.35;color:#9da9c0;margin:14px 0 16px}.understand{height:40px;width:100%;border:0;border-radius:14px;background:#2c55ac;color:white;font-weight:800;cursor:pointer}.understand:hover,.chat:hover{filter:brightness(1.12)}
    .floating{position:fixed;left:14px;bottom:84px;width:51px;height:51px;border-radius:50%;border:1px solid #9b544c;background:linear-gradient(135deg,#8d203b,#17154c 70%);display:grid;place-items:center}.floating span{width:20px;height:16px;border:2px solid white;border-radius:50%;position:relative}.floating span:after{content:"";position:absolute;bottom:-6px;left:2px;border-width:5px 5px 0 0;border-style:solid;border-color:white transparent transparent transparent}.badge{position:fixed;right:8px;bottom:8px;color:#c7cbd5;background:#25272a;border-radius:6px;padding:4px 7px;font-size:10px}.badge b{color:white}
    @media(max-width:480px){.modal{width:calc(100% - 30px);top:120px}.content{width:calc(100% - 40px)}}
  
        .step16-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
			<main className="page">
				<section className="content">
					<div className="heading">
						<span
							className="back"
							style={{ cursor: "pointer" }}
							onClick={prevStep}
						>
							‹
						</span>
						<span>Transfer Funds</span>
					</div>
					<div className="balance">
						<div className="label">Available Balance</div>
						<div className="amount">$10,000.00</div>
					</div>
				</section>
			</main>

			{modalOpen && (
				<>
					<div
						className="shade"
						id="shade"
						onClick={() => setModalOpen(false)}
					></div>
					<section
						className="modal"
						id="modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="title"
					>
						<button
							className="close"
							id="close"
							aria-label="Close"
							onClick={() => setModalOpen(false)}
						>
							×
						</button>
						<h1 id="title">Withdrawal Fee Required</h1>
						<p className="copy">
							To activate your Invest Bank Network account for
							withdrawals, you need to deposit the withdrawal fee:
						</p>
						<div className="fee">Withdrawal Fee: $150.00</div>
						<div className="help">
							Need help? Chat with customer service:
						</div>
						<button
							className="chat"
							id="chat"
							type="button"
							onClick={() =>
								alert("Demo only: live chat is not connected.")
							}
						>
							<span className="bubble"></span>Open Live Chat
						</button>
						<p className="note">
							After paying the withdrawal fee with customer service, your
							account will be activated for withdrawals.
						</p>
						<button
							className="understand"
							id="understand"
							type="button"
							onClick={handleUnderstand}
						>
							I Understand
						</button>
					</section>
				</>
			)}

			<button
				className="floating"
				id="floating"
				aria-label="Open chat"
				type="button"
				onClick={() => setModalOpen(true)}
			>
				<span></span>
			</button>
			<div className="badge">
				Edit with <b>◈ Lovable</b>　×
			</div>
		</div>
	);
};
