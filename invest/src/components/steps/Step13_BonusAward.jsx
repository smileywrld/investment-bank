import React, { useState } from "react";
import { useStepper } from "../../context/StepperContext";

export const Step13_BonusAward = () => {
	const { data, nextStep } = useStepper();
	const [modalOpen, setModalOpen] = useState(true);
	const [toast, setToast] = useState("");

	const displayEmail = data.email || "quoupaupoigrobre-4003@yopmail.com";

	const handleClaim = () => {
		setModalOpen(false);
		setToast("Bonus claimed successfully!");
		setTimeout(() => {
			nextStep();
		}, 600);
	};

	return (
		<div className="step13-root">
			<style>{`

    .step13-root{--bg:#020611;--panel:#071126;--panel2:#080d1b;--text:#f3f4f8;--muted:#8290a8;--gold:#f0c85f;--border:#152139}
    *{box-sizing:border-box} .step13-root{margin:0;min-height:100vh;background:radial-gradient(circle at 80% 0%,#14030f 0,transparent 35%),radial-gradient(circle at 15% 0%,#041326 0,transparent 35%),var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}
    button{font:inherit;cursor:pointer}.shell{width:min(380px,calc(100% - 32px));margin:0 auto;padding:40px 0 34px}.top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px}.welcome h1{font-size:25px;line-height:1.1;margin:0 0 6px;font-weight:750}.email{color:#53627c;font-size:14px;line-height:1.5;max-width:245px;word-break:break-word}.actions{display:flex;align-items:center;gap:18px}.icon{border:0;background:none;color:#6f7890;font-size:20px;padding:4px}.avatar{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:linear-gradient(145deg,#c99e32,#4e3d15);color:#080b10;font-weight:700}
    .card{border:1px solid var(--border);border-radius:22px;background:linear-gradient(150deg,rgba(12,18,38,.9),rgba(30,5,15,.8));padding:22px 18px;margin-bottom:18px;box-shadow:0 18px 45px #0005}.balance{text-align:center}.label{font-size:13px;color:#98a0b3;margin-bottom:5px}.amount{font-weight:750;font-size:34px;letter-spacing:-1px}.transaction{display:flex;align-items:center;gap:12px;margin-top:24px;padding-top:18px;border-top:1px solid #1c2437}.tx-icon{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#554616;color:#f0cf71;font-size:17px}.tx-copy{flex:1}.tx-name{font-weight:650;font-size:14px}.tx-date{font-size:12px;color:#70809b;margin-top:3px}.bonus{font-size:12px;color:#8996ac}.support{background:linear-gradient(150deg,#071022,#07101e);padding:20px 18px}.support h2{font-size:16px;margin:0 0 17px;color:#8794aa}.support p{font-size:12px;color:#77849a;margin:0 0 10px}.contact{height:40px;padding:0 12px;border-radius:13px;background:#0b1220;display:flex;align-items:center;justify-content:space-between;color:#71809a;font-size:12px}.copy{border:0;background:transparent;color:#6d7890;font-size:17px}.chat{position:fixed;left:14px;bottom:85px;width:51px;height:51px;border-radius:50%;border:1px solid #a4585f;background:linear-gradient(145deg,#551d37,#17152f);color:#fff;font-size:24px;box-shadow:0 5px 20px #0008}
    .veil{position:fixed;inset:0;background:#000a;display:grid;place-items:center;padding:20px}.modal{position:relative;width:min(403px,100%);padding:22px;border-radius:23px;background:#071332;box-shadow:0 25px 80px #000b;text-align:center}.close{position:absolute;right:14px;top:12px;background:none;border:0;color:#aab3c3;font-size:24px}.gift{margin:0 auto 16px;width:51px;height:51px;border:1px solid #d0aa3d;border-radius:50%;display:grid;place-items:center;color:#f6d774;font-size:27px}.modal h2{font-size:21px;margin:0 0 10px}.congrats{font-weight:700;font-size:14px;margin-bottom:12px}.modal p{font-size:13px;color:#8b96ad;margin:0}.modal strong{color:#eef1f7}.claim{width:100%;height:41px;border-radius:14px;border:1px solid #a97843;margin-top:21px;color:#fff;font-weight:700;background:linear-gradient(100deg,#851a50,#56306a 48%,#733d13)}
    .toast{position:fixed;left:50%;bottom:25px;transform:translateX(-50%) translateY(20px);background:#182139;color:#fff;padding:12px 18px;border-radius:10px;opacity:0;transition:.25s;pointer-events:none;font-size:13px}.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
  
        .step13-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
			<main className="shell">
				<header className="top">
					<div className="welcome">
						<h1>Welcome back</h1>
						<div className="email">{displayEmail}</div>
					</div>
					<div className="actions">
						<button className="icon" aria-label="Notifications">
							♧
						</button>
						<button className="icon" aria-label="Sign out">
							↪
						</button>
						<div className="avatar">Si</div>
					</div>
				</header>
				<section className="card balance">
					<div className="label">Available Balance</div>
					<div className="amount">$10,000.00</div>
					<div className="transaction">
						<div className="tx-icon">▣</div>
						<div className="tx-copy">
							<div className="tx-name">Invest Bank Bank</div>
							<div className="tx-date">Sep 11, 9:13 AM</div>
						</div>
						<div className="bonus">Bonus</div>
					</div>
				</section>
				<section className="card support">
					<h2>✉ &nbsp;Support</h2>
					<p>Need help? Contact us:</p>
					<div className="contact">
						<span>smartbnkcustomercare@zohomail.com</span>
						<button
							className="copy"
							aria-label="Copy email"
							onClick={() => {
								navigator.clipboard?.writeText(
									"smartbnkcustomercare@zohomail.com",
								);
								alert("Email copied");
							}}
						>
							▣
						</button>
					</div>
				</section>
			</main>
			<button className="chat" aria-label="Open chat">
				◯
			</button>

			{modalOpen && (
				<div className="veil" id="welcomeModal">
					<section
						className="modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="welcomeTitle"
					>
						<button
							className="close"
							id="closeModal"
							aria-label="Close"
							onClick={() => setModalOpen(false)}
						>
							×
						</button>
						<div className="gift">♔</div>
						<h2 id="welcomeTitle">Welcome!</h2>
						<div className="congrats">Congratulations 🎉</div>
						<p>
							You just won <strong>$10,000.00</strong> from{" "}
							<strong>Invest Bank Bank.</strong>
						</p>
						<button
							className="claim"
							id="claimBonus"
							onClick={handleClaim}
						>
							Claim Bonus
						</button>
					</section>
				</div>
			)}

			<div className={`toast ${toast ? "show" : ""}`} id="toast">
				{toast}
			</div>
		</div>
	);
};
