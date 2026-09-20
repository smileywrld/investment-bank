import React, { useState } from 'react';
import { useStepper, transferMethodsMap } from '../../context/StepperContext';

export const Step15_TransferDetails = () => {
  const { data, updateData, nextStep, prevStep } = useStepper();
  const [cashtag, setCashtag] = useState(data.cashtag || '');
  const [amount, setAmount] = useState(data.amount || '10000.00');
  const [toast, setToast] = useState('');

  const method = transferMethodsMap[data.selectedTransferMethod] || transferMethodsMap['CashApp'];
  const isValid = cashtag.trim() && Number(amount) > 0 && Number(amount) <= 10000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      updateData({ cashtag, amount });
      setToast(`Transfer request for $${Number(amount).toFixed(2)} is ready to review.`);
      setTimeout(() => {
        nextStep();
      }, 550);
    }
  };

  return (
    <div className="step15-root">
      <style>{`

    .step15-root {
      --bg: #02091d;
      --panel: #0d1428;
      --field: #08142f;
      --border: rgba(153, 184, 255, .16);
      --text: #f5f7ff;
      --muted: #a6bfe6;
      --blue: #2d57b8;
      --green: #00d987;
    }
    * { box-sizing: border-box; }
    .step15-root {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      background:
        radial-gradient(ellipse 45% 35% at 6% 0%, rgba(15, 48, 119, .42), transparent 72%),
        radial-gradient(ellipse 46% 35% at 98% 0%, rgba(102, 0, 45, .42), transparent 72%),
        linear-gradient(180deg, #020818 0%, #010719 48%, #050b1b 100%);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .page { width: min(368px, calc(100% - 32px)); margin: 34px auto 0; }
    .title-row { display: flex; align-items: center; gap: 20px; margin-bottom: 22px; }
    .back { color: #eaf0ff; font-size: 31px; line-height: 1; text-decoration: none; font-weight: 300; }
    h1 { font-size: 25px; margin: 0; font-weight: 750; letter-spacing: -.5px; }
    .balance { height: 93px; padding: 18px 19px; border: 1px solid var(--border); border-radius: 21px; background: rgba(16, 23, 43, .9); box-shadow: 0 16px 35px rgba(0,0,0,.13); }
    .balance-label { display: block; color: #91b4e4; font-size: 12px; margin-bottom: 4px; }
    .amount { color: var(--blue); font-size: 28px; letter-spacing: -.8px; }
    form { margin-top: 27px; }
    .section-title { display: flex; align-items: center; gap: 12px; font-size: 17px; font-weight: 750; margin-bottom: 16px; }
    .card-icon { width: 20px; height: 14px; border: 2px solid var(--green); border-radius: 2px; display: inline-block; position: relative; }
    .card-icon::after { content: ""; position: absolute; left: 0; right: 0; top: 3px; border-top: 2px solid var(--green); }
    label { display: block; font-size: 13px; font-weight: 700; margin: 0 0 7px; }
    .field { width: 100%; height: 38px; border-radius: 14px; border: 1px solid var(--border); background: rgba(8, 20, 47, .92); color: white; padding: 0 11px; font-size: 13px; outline: none; transition: border .2s, box-shadow .2s; }
    .field::placeholder { color: #a5b9db; opacity: .95; }
    .field:focus { border-color: #527bd3; box-shadow: 0 0 0 3px rgba(82,123,211,.16); }
    .group { margin-bottom: 15px; }
    button { width: 100%; height: 42px; margin-top: 0; border: 1px solid rgba(194, 67, 80, .27); border-radius: 13px; color: #95959d; font-size: 13px; font-weight: 750; background: linear-gradient(100deg, rgba(118, 0, 47, .65), rgba(107, 25, 20, .42) 58%, rgba(12, 30, 81, .78)); cursor: pointer; transition: filter .2s, transform .15s; }
    button:not(:disabled) { color: white; filter: saturate(1.25); }
    button:not(:disabled):hover { filter: brightness(1.2); }
    button:active:not(:disabled) { transform: scale(.99); }
    .chat { position: fixed; left: 14px; bottom: 86px; width: 51px; height: 51px; border-radius: 50%; border: 1px solid rgba(255, 196, 132, .45); background: linear-gradient(140deg, #87123d, #10265c); display: grid; place-items: center; box-shadow: 0 8px 20px rgba(0,0,0,.25); }
    .chat::before { content: ""; width: 17px; height: 15px; border: 2px solid white; border-radius: 50%; }
    .chat::after { content: ""; position: absolute; width: 6px; height: 6px; border-left: 2px solid white; border-bottom: 2px solid white; transform: translate(5px, 6px) rotate(-15deg); }
    .toast { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%) translateY(15px); padding: 11px 16px; border-radius: 10px; background: #151b2a; border: 1px solid var(--border); color: #dce8ff; font-size: 13px; opacity: 0; pointer-events: none; transition: .25s; }
    .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    @media (max-width: 500px) { .page { margin-top: 24px; } .chat { bottom: 28px; } }
  
        .step15-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
      <main className="page">
        <div className="title-row">
          <a className="back" href="#" aria-label="Go back" onClick={(e) => { e.preventDefault(); prevStep(); }}>←</a>
          <h1>Transfer Funds</h1>
        </div>
        <section className="balance" aria-label="Available balance">
          <span className="balance-label">Available Balance</span>
          <span className="amount">$10,000.00</span>
        </section>
        <form id="transferForm" onSubmit={handleSubmit}>
          <div className="section-title">
            <span className="card-icon" aria-hidden="true"></span>
            {method.title}
          </div>
          <div className="group">
            <label htmlFor="cashtag">{method.label}</label>
            <input
              className="field"
              id="cashtag"
              name="cashtag"
              placeholder={method.placeholder}
              autoComplete="off"
              required
              value={cashtag}
              onChange={(e) => setCashtag(e.target.value)}
            />
          </div>
          <div className="group">
            <label htmlFor="amount">Amount (USD)</label>
            <input
              className="field"
              id="amount"
              name="amount"
              placeholder="0.00"
              type="number"
              min="0.01"
              max="10000"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button id="confirm" type="submit" disabled={!isValid}>
            Confirm Transfer
          </button>
        </form>
      </main>
      <div className="chat" aria-label="Support chat" role="button" tabIndex={0}></div>
      <div className={`toast ${toast ? 'show' : ''}`} id="toast" role="status">{toast}</div>
    </div>
  );
};
