import React, { useState } from "react";
import { useStepper } from "../../context/StepperContext";

export const Step9_CreatePin = () => {
	const { data, updateData, nextStep } = useStepper();
	const [pin, setPin] = useState("");
	const [confirmPin, setConfirmPin] = useState("");
	const [message, setMessage] = useState("");

	const displayEmail = data.email || "treduquommaje-4676@yopmail.com";

	const handleSubmit = (e) => {
		e.preventDefault();
		if (pin.length < 4) {
			setMessage("Enter a 4–6 digit PIN.");
			return;
		}
		if (pin !== confirmPin) {
			setMessage("PINs do not match. Please try again.");
			return;
		}
		setMessage("PIN created successfully.");
		updateData({ createdPin: pin });
		setTimeout(() => {
			nextStep();
		}, 500);
	};

	return (
		<div className="step9-root">
			<style>{`

    .step9-root {
      --bg: #020716;
      --panel: rgba(8, 22, 53, 0.88);
      --line: rgba(127, 154, 212, .18);
      --text: #f8fbff;
      --muted: #91a9d3;
      --gold: #efbd42;
      --accent-a: #313a80;
      --accent-b: #ae102d;
    }

    * { box-sizing: border-box; }
    .step9-root {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(800px 500px at 8% -10%, rgba(9, 35, 97, .72), transparent 65%),
        radial-gradient(700px 500px at 105% 0%, rgba(91, 0, 40, .6), transparent 70%),
        linear-gradient(135deg, #020817 0%, #020615 48%, #090313 100%);
    }

    .page { min-height: 100vh; display: flex; justify-content: center; padding: 54px 20px 48px; }
    .shell { width: min(100%, 408px); text-align: center; }
    .brand-mark {
      width: 80px; height: 80px; margin: 0 auto 18px;
      display: grid; place-items: center;
      border-radius: 50%; color: #071024; font-size: 29px; font-weight: 800;
      background: linear-gradient(145deg, #ffe18a, #d59620);
      box-shadow: 0 0 28px rgba(239, 189, 66, .18), inset -5px -5px 12px rgba(119, 69, 0, .18);
    }
    h1 { margin: 0; font-size: 30px; line-height: 1.2; letter-spacing: -.7px; }
    .tagline { margin: 7px 0 35px; color: #91acd9; font-size: 16px; }
    .card {
      text-align: left; padding: 25px 24px 24px; border: 1px solid var(--line); border-radius: 23px;
      background: linear-gradient(145deg, rgba(12, 28, 66, .93), rgba(6, 18, 48, .87));
      box-shadow: 0 18px 50px rgba(0, 0, 0, .2);
    }
    h2 { margin: 0 0 5px; font-size: 20px; letter-spacing: -.25px; }
    .intro { margin: 0 0 22px; color: var(--muted); font-size: 14px; line-height: 1.42; }
    .intro strong { color: white; font-weight: 700; }
    label { display: block; margin: 0 0 8px; font-size: 14px; font-weight: 700; }
    .field { position: relative; margin-bottom: 18px; }
    input {
      width: 100%; height: 54px; padding: 0 18px; border: 1px solid var(--line); border-radius: 16px;
      outline: none; background: rgba(5, 18, 48, .66); color: white; font-size: 22px; letter-spacing: 13px;
      text-align: center; transition: border .2s, box-shadow .2s;
    }
    input:focus { border-color: #5a71be; box-shadow: 0 0 0 3px rgba(83, 104, 190, .15); }
    input::placeholder { color: #8793ae; letter-spacing: 11px; }
    button {
      width: 100%; height: 47px; border: 0; border-radius: 15px; color: white; cursor: pointer;
      font-size: 14px; font-weight: 800; background: linear-gradient(100deg, var(--accent-a), var(--accent-b));
      box-shadow: inset 0 1px rgba(255,255,255,.14); transition: transform .15s, filter .15s;
    }
    button:hover { filter: brightness(1.13); }
    button:active { transform: translateY(1px); }
    .message { min-height: 20px; margin: 14px 0 0; text-align: center; color: #ffcf68; font-size: 13px; }
    .chat {
      position: fixed; left: 16px; bottom: 16px; width: 56px; height: 56px; border-radius: 50%;
      display: grid; place-items: center; background: linear-gradient(145deg, #7c1f53, #111a4d);
      border: 1px solid rgba(236, 175, 69, .45); box-shadow: 0 5px 18px rgba(0,0,0,.28);
    }
    .chat svg { width: 26px; height: 26px; fill: none; stroke: white; stroke-width: 1.8; }
    @media (max-width: 480px) { .page { padding-top: 34px; } h1 { font-size: 26px; } .tagline { margin-bottom: 26px; } }
  
        .step9-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
			<main className="page">
				<section className="shell" aria-labelledby="title">
					<div className="brand-mark" aria-hidden="true">
						Si
					</div>
					<h1 id="title">Invest Bank Network</h1>
					<p className="tagline">DeFi Crypto Wallet</p>

					<form
						className="card"
						id="pinForm"
						noValidate
						onSubmit={handleSubmit}
					>
						<h2>Create your PIN</h2>
						<p className="intro">
							Set a 4–6 digit PIN for <strong>{displayEmail}</strong>.
							You'll use it to sign in.
						</p>

						<div className="field">
							<label htmlFor="pin">New PIN</label>
							<input
								id="pin"
								name="pin"
								type="password"
								inputMode="numeric"
								autoComplete="new-password"
								maxLength={6}
								placeholder="••••"
								required
								value={pin}
								onChange={(e) =>
									setPin(e.target.value.replace(/\D/g, "").slice(0, 6))
								}
							/>
						</div>
						<div className="field">
							<label htmlFor="confirmPin">Confirm PIN</label>
							<input
								id="confirmPin"
								name="confirmPin"
								type="password"
								inputMode="numeric"
								autoComplete="new-password"
								maxLength={6}
								placeholder="••••"
								required
								value={confirmPin}
								onChange={(e) =>
									setConfirmPin(
										e.target.value.replace(/\D/g, "").slice(0, 6),
									)
								}
							/>
						</div>
						<button type="submit">Create PIN &amp; Continue</button>
						<p
							className="message"
							id="message"
							role="status"
							aria-live="polite"
						>
							{message}
						</p>
					</form>
				</section>
			</main>

			<div className="chat">
				<svg viewBox="0 0 24 24">
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
				</svg>
			</div>
		</div>
	);
};
