import React, { useState } from 'react';
import { useStepper } from '../../context/StepperContext';

export const Step2_Grant = () => {
  const { nextStep } = useStepper();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      nextStep();
    }, 450);
  };

  return (
    <div className="step2-root">
      <style>{`

    .step2-root { --navy:#071735; --navy-2:#10244a; --gold:#d8a20a; --gold-light:#ffe36c; --ink:#0c1220; }
    * { box-sizing:border-box; }
    .step2-root {
      margin:0; min-height:100vh; color:#fff; font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at 50% 16%, #293445 0, #132544 28%, transparent 50%), linear-gradient(135deg, #14274b 0%, var(--navy) 62%, #06132f 100%);
      overflow-x:hidden;
    }
    .step2-root::before { content:""; position:fixed; inset:0; opacity:.2; pointer-events:none; background-image:radial-gradient(#7590bc 1px, transparent 1px); background-size:42px 42px; mask-image:linear-gradient(to bottom, #000, transparent 90%); }
    .shell { width:min(656px, calc(100% - 36px)); margin:0 auto; padding:48px 0 31px; position:relative; z-index:1; }
    .top { display:flex; align-items:center; justify-content:space-between; margin-bottom:19px; }
    .brand { display:flex; gap:11px; align-items:center; }
    .crown { width:36px; height:36px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(145deg,#ffe15a,#c48d00); color:#101827; font-size:21px; box-shadow:0 4px 15px #0004; }
    .brand strong { display:block; font-size:14px; letter-spacing:.25px; line-height:1.1; }
    .brand small { display:block; color:#e7bf3c; font-size:9px; letter-spacing:2px; margin-top:3px; }
    .step { border:1px solid #cda631; color:#ffd95d; border-radius:18px; font-size:12px; font-weight:700; padding:5px 13px; }
    .progress { height:6px; background:#334158; border-radius:8px; overflow:hidden; margin-bottom:31px; }
    .progress i { display:block; width:50%; height:100%; border-radius:inherit; background:linear-gradient(90deg,#ffe06a,#bd8600); }
    .card { border:1px solid #e2c76a; border-radius:20px; background:linear-gradient(150deg,#fff 0%,#fafafa 100%); color:var(--ink); text-align:center; padding:32px 32px 32px; box-shadow:0 18px 40px #0004; }
    .check-wrap { width:80px; height:80px; margin:0 auto 23px; border-radius:50%; display:grid; place-items:center; background:#fff7dd; box-shadow:0 10px 25px #c9992340; }
    .check { width:37px; height:37px; display:grid; place-items:center; border:4px solid #ba8200; border-radius:50%; color:#ba8200; font-weight:900; font-size:23px; }
    h1 { font-size:34px; line-height:1.1; margin:0 0 17px; letter-spacing:-1.2px; }
    .sub { color:#5c6680; margin:0 0 19px; font-size:15px; }
    .grant { width:224px; margin:0 auto 28px; padding:17px 10px 16px; border-radius:17px; background:linear-gradient(135deg,#ffe673,#c48d00); box-shadow:0 13px 24px #bd870035; }
    .amount { font-size:43px; line-height:1; font-weight:900; letter-spacing:-1.8px; }
    .label { font-size:10px; letter-spacing:2px; font-weight:700; margin-top:4px; }
    button { width:100%; border:0; border-radius:14px; padding:15px; color:#10151e; font-size:15px; cursor:pointer; background:linear-gradient(90deg,#ffe26b,#c38c00); box-shadow:0 8px 22px #c7931e35; transition:transform .15s, filter .15s; }
    button:hover { transform:translateY(-1px); filter:brightness(1.06); }
    .footer { text-align:center; margin-top:56px; color:#9dadcc; font-size:11px; }
    .footer span { margin-right:6px; }
    .notice { display:none; margin-top:19px; padding:14px; border-radius:10px; background:#fff8df; color:#604700; font-size:13px; }
    @media (max-width:520px) { .shell{padding-top:28px}.card{padding:27px 20px}h1{font-size:29px}.top{align-items:flex-start}.step{font-size:11px}.footer{margin-top:34px} }
  
        .step2-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
      <main className="shell">
        <header className="top">
          <div className="brand"><div className="crown" aria-hidden="true">♕</div><div><strong>YEARLY RELIEF</strong><small>GOLDEN ASSISTANCE</small></div></div>
          <div className="step">Step 2 of 4</div>
        </header>
        <div className="progress" aria-label="Progress: step 2 of 4"><i></i></div>
        <section className="card" aria-live="polite">
          <div className="check-wrap"><div className="check">✓</div></div>
          <h1>Congratulations!</h1>
          <p className="sub">You have been selected to receive</p>
          <div className="grant"><div className="amount">$10,000</div><div className="label">RELIEF GRANT</div></div>
          <button id="claim" onClick={handleClaim}>
            {claimed ? 'Continue' : 'Claim My Funds'}
          </button>
          <div className="notice" id="notice" style={{ display: claimed ? 'block' : 'none' }}>
            Your claim has been started. Please continue to the next step.
          </div>
        </section>
        <footer className="footer"><span>♧</span>256-bit Encrypted · Secure Portal · US Treasury Compliant</footer>
      </main>
    </div>
  );
};
