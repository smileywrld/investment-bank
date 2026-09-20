import React, { useState } from 'react';
import { useStepper, paymentMethodsMap } from '../../context/StepperContext';

export const Step4_PaymentDetails = () => {
  const { data, updateData, nextStep, prevStep, goToStep } = useStepper();
  const [demoId, setDemoId] = useState(data.demoId || '');

  const method = paymentMethodsMap[data.selectedPaymentMethod] || paymentMethodsMap['Chime'];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ demoId });
    nextStep();
  };

  return (
    <div className="step4-root">
      <style>{`

    .step4-root{--navy:#071a3c;--gold:#d6aa16;--gold2:#f8dc62;--ink:#101522;--muted:#78849d;--line:#f0d994}
    *{box-sizing:border-box} .step4-root{margin:0;min-height:100vh;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;color:var(--ink);background:radial-gradient(circle at 52% 18%,#26364c 0,#112445 34%,#061735 80%);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .step4-root:before{content:"";position:fixed;inset:0;opacity:.15;background-image:radial-gradient(#fff 1px,transparent 1px);background-size:22px 22px;pointer-events:none}
    .shell{width:min(656px,calc(100% - 32px));position:relative;padding:22px 0 72px}.top{display:flex;align-items:center;justify-content:space-between;margin:0 0 18px}.brand{display:flex;align-items:center;gap:11px;color:white}.badge{width:37px;height:37px;border-radius:50%;display:grid;place-items:center;background:#e6bd28;color:#111;font-size:20px;box-shadow:0 3px 10px #0004}.brand strong{display:block;font-size:14px;letter-spacing:.04em}.brand small{display:block;color:#d6ba57;font-size:9px;letter-spacing:.2em}.step{color:#f0cf58;border:1px solid #cba72e;border-radius:16px;padding:5px 12px;font-size:12px}.progress{height:6px;border-radius:8px;background:linear-gradient(90deg,var(--gold2),#c38f00);margin-bottom:32px}.card{background:#fbfbfc;border:1px solid #d6ae26;border-radius:20px;padding:37px 32px 32px;box-shadow:0 18px 45px #0005}.eyebrow{color:#a47700;font-size:10px;font-weight:800;letter-spacing:.18em}.card h1{margin:0;font-size:29px;letter-spacing:-.03em}.sub{margin:10px 0 26px;color:var(--muted);font-size:15px}.method{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:18px;padding:12px;background:#fffaf0;margin-bottom:25px}.method-icon{width:48px;height:48px;border-radius:15px;background:#1fc878;color:white;display:grid;place-items:center;font-weight:800;font-size:25px}.change{margin-left:auto;border:0;background:transparent;color:#9a7100;cursor:pointer}.field label{display:block;font-size:13px;font-weight:700;margin-bottom:10px}.field input{width:100%;height:50px;border:1px solid var(--line);border-radius:13px;padding:0 16px;font-size:16px;outline:none}.field input:focus{border-color:#c89e16;box-shadow:0 0 0 3px #e9ca5933}.actions{display:flex;gap:12px;margin-top:23px}.back{width:54px;height:50px;border:1px solid var(--line);border-radius:14px;background:white;font-size:25px;cursor:pointer}.submit{flex:1;height:50px;border:0;border-radius:13px;background:linear-gradient(90deg,var(--gold2),#bd8a00);font-size:15px;cursor:pointer;box-shadow:0 10px 18px #c79c2630}.notice{margin-top:15px;color:#9b6f00;font-size:11px;text-align:center}.footer{position:absolute;bottom:0;left:0;right:0;text-align:center;color:#91a0be;font-size:11px}.demo{position:fixed;top:14px;right:14px;background:#fff1a8;color:#5c4700;border:1px solid #d9af23;border-radius:8px;padding:7px 10px;font-size:11px;font-weight:700;z-index:2}@media(max-width:560px){.card{padding:28px 20px 22px}.card h1{font-size:25px}.shell{padding-top:45px}.top{align-items:flex-start}.step{font-size:10px}}
  
        .step4-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <main className="shell" aria-label="Yearly Relief demo payment details">
        <header className="top">
          <div className="brand"><div className="badge">♛</div><div><strong>YEARLY RELIEF</strong><small>GOLDEN ASSISTANCE</small></div></div>
          <div className="step">Step 4 of 4</div>
        </header>
        <div className="progress" aria-hidden="true"></div>
        <section className="card">
          <h1>Payment Details</h1>
          <p className="sub">Enter demo information to preview the transfer flow.</p>
          <div className="method">
            <div className="method-icon" style={{ background: method.bg, color: method.color || '#fff' }}>
              {method.icon}
            </div>
            <div>
              <div className="eyebrow">SELECTED METHOD</div>
              <strong>{method.name}</strong>
            </div>
            <button className="change" type="button" onClick={() => goToStep(3)}>Change</button>
          </div>
          <form id="demoForm" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="demo-id">{method.label}</label>
              <input
                id="demo-id"
                name="demo-id"
                autoComplete="off"
                required
                placeholder={method.placeholder}
                value={demoId}
                onChange={(e) => setDemoId(e.target.value)}
              />
            </div>
            <div className="actions">
              <button className="back" type="button" aria-label="Go back" onClick={prevStep}>←</button>
              <button className="submit" type="submit">Preview Claim</button>
            </div>
          </form>
          <div className="notice">This interface is a non-functional design prototype. Do not enter financial or login information.</div>
        </section>
        <div className="footer"><span>♧ SSL Secured</span><span>♧ Private</span><span>✥ Verified</span></div>
      </main>
    </div>
  );
};
