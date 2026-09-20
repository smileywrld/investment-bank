import React, { useState } from 'react';
import { useStepper } from '../../context/StepperContext';

export const Step5_SecurityHandoff = () => {
  const { nextStep } = useStepper();
  const [showNotice, setShowNotice] = useState(false);

  const handleContinue = () => {
    setShowNotice(true);
    setTimeout(() => {
      nextStep();
    }, 450);
  };

  return (
    <div className="step5-root">
      <style>{`

    .step5-root {
      --navy: #061735;
      --navy-deep: #04122c;
      --gold: #e5b82b;
      --gold-light: #f9db63;
      --ink: #0d111d;
      --muted: #657087;
      --card: #fffefa;
    }
    * { box-sizing: border-box; }
    .step5-root {
      margin: 0;
      min-height: 100vh;
      color: #fff;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at 70% 8%, rgba(255,255,255,.07) 0 1px, transparent 1.5px) 0 0/38px 38px,
        radial-gradient(circle at 22% 62%, rgba(255,255,255,.05) 0 1px, transparent 1.5px) 0 0/32px 32px,
        linear-gradient(140deg, #1b2a3d 0%, var(--navy) 40%, var(--navy-deep) 100%);
      display: flex;
      justify-content: center;
      overflow-x: hidden;
    }
    .shell { width: min(100%, 740px); min-height: 100vh; padding: 80px 28px 30px; display: flex; flex-direction: column; }
    .topbar { display:flex; align-items:center; justify-content:space-between; gap:18px; }
    .brand { display:flex; align-items:center; gap:10px; }
    .brand-mark { width:37px; height:37px; border-radius:50%; display:grid; place-items:center; color:#111827; background:linear-gradient(145deg,#ffe36d,#d39d09); box-shadow:0 8px 20px rgba(218,174,35,.2); }
    .brand-mark svg { width:22px; height:22px; }
    .brand-title { font-size:14px; line-height:1.1; font-weight:800; letter-spacing:.01em; }
    .brand-sub { margin-top:4px; color:#d6d9df; font-size:9px; letter-spacing:.2em; }
    .step { border:1px solid #9b7e26; color:#f8d85a; padding:5px 12px; border-radius:999px; font-size:12px; font-weight:700; white-space:nowrap; }
    .progress { height:6px; margin-top:16px; border-radius:99px; background:linear-gradient(90deg,var(--gold-light),#c28f00); box-shadow:0 0 9px rgba(244,205,67,.17); }
    .card { margin-top:32px; min-height:332px; border:1px solid #dfca8c; border-radius:20px; background:rgba(255,255,253,.98); color:var(--ink); box-shadow:0 22px 45px rgba(0,0,0,.2); display:flex; flex-direction:column; align-items:center; text-align:center; padding:31px 30px 27px; }
    .success { width:80px; height:80px; border-radius:50%; display:grid; place-items:center; margin-bottom:22px; background:radial-gradient(circle, #c99e19 0 43%, #f7d45b 44% 56%, #fff8da 57% 68%, #f0deb1 69% 100%); box-shadow:0 10px 22px rgba(190,150,26,.18); }
    .success-inner { width:31px; height:31px; border:3px solid #111827; border-radius:50%; display:grid; place-items:center; }
    .success-inner:after { content:""; width:9px; height:5px; border-left:3px solid #111827; border-bottom:3px solid #111827; transform:rotate(-45deg) translate(1px,-2px); }
    h1 { margin:0; font-size:30px; letter-spacing:-.04em; line-height:1.1; font-weight:850; }
    .lead { margin:13px 0 25px; color:#667087; font-size:14px; }
    .meter { width:min(100%,318px); height:8px; border-radius:99px; background:#e6e7e8; overflow:hidden; }
    .meter > span { display:block; width:100%; height:100%; border-radius:inherit; background:linear-gradient(90deg,#f8d968,#c99610); }
    .meter-labels { width:min(100%,318px); display:flex; justify-content:space-between; margin-top:9px; color:#637087; font-size:11px; }
    .continue { margin-top:23px; color:#9b7105; font-size:14px; font-weight:700; text-decoration:underline; text-underline-offset:3px; cursor:pointer; }
    .notice { display:none; margin-top:14px; max-width:420px; color:#667087; font-size:12px; line-height:1.45; }
    footer { margin-top:auto; padding-top:72px; text-align:center; color:#9ba5ba; font-size:11px; }
    footer span { color:#d2a936; }
    .demo { position:fixed; right:14px; bottom:12px; background:#202020; color:#f3f3f3; border:1px solid #444; border-radius:6px; padding:7px 10px; font-size:11px; box-shadow:0 4px 14px #0005; }
    @media (max-width:600px) { .shell { padding:34px 18px 22px; } .card { margin-top:25px; padding-inline:20px; } h1 { font-size:27px; } .topbar { align-items:flex-start; } }
  
        .step5-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
        }
      `}</style>
      <main className="shell" aria-label="Yearly Relief demo confirmation">
        <header>
          <div className="topbar">
            <div className="brand">
              <div className="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8v9h16V8M4 8l2-3h12l2 3M8 8v5m4-5v5m4-5v5"/><path d="M7 19h10"/></svg></div>
              <div><div className="brand-title">YEARLY RELIEF</div><div className="brand-sub">GOLDEN ASSISTANCE</div></div>
            </div>
            <div className="step">Step 4 of 4</div>
          </div>
          <div className="progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </header>

        <section className="card">
          <div className="success" aria-hidden="true"><div className="success-inner"></div></div>
          <h1>Submission Received</h1>
          <p className="lead">Preparing your secure wallet handoff...</p>
          <div className="meter"><span></span></div>
          <div className="meter-labels"><span>Encrypting session</span><span>100%</span></div>
          <button className="continue" type="button" onClick={handleContinue}>Continue manually</button>
          <p className="notice" style={{ display: showNotice ? 'block' : 'none' }}>Demo only: no wallet, identity, or financial information is collected or transmitted.</p>
        </section>
        <footer>♧ &nbsp;256-bit Encrypted <span>·</span> Secure Portal <span>·</span> US Treasury Compliant</footer>
      </main>
    </div>
  );
};
