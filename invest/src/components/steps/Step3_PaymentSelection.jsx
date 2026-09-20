import React, { useState } from 'react';
import { useStepper } from '../../context/StepperContext';

export const Step3_PaymentSelection = () => {
  const { data, updateData, nextStep, prevStep } = useStepper();
  const [selected, setSelected] = useState(data.selectedPaymentMethod || '');

  const methodsList = [
    { id: 'Cash App', icon: '$', class: 'cash' },
    { id: 'Zelle', icon: 'Z', class: 'zelle' },
    { id: 'Apple Pay', icon: '', class: 'apple' },
    { id: 'PayPal', icon: 'P', class: 'paypal' },
    { id: 'Venmo', icon: 'V', class: 'venmo' },
    { id: 'Chime', icon: 'C', class: 'chime' },
    { id: 'Cash Mailing', icon: '✉', class: 'mail' },
    { id: 'Wire Transfer', icon: '▣', class: 'wire' },
    { id: 'Wire Check Mailing', icon: '⇥', class: 'check' }
  ];

  const handleSelect = (methodId) => {
    setSelected(methodId);
    updateData({ selectedPaymentMethod: methodId });
  };

  const handleContinue = () => {
    if (selected) {
      nextStep();
    }
  };

  return (
    <div className="step3-root">
      <style>{`

    .step3-root {
      --navy: #071b42;
      --navy-deep: #061636;
      --gold: #f3cc45;
      --gold-dark: #bd941b;
      --ink: #111625;
      --muted: #737e96;
      --line: #dde1e8;
      --card: #fff;
    }
    * { box-sizing: border-box; }
    .step3-root {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--ink);
      background:
        radial-gradient(circle at 73% 12%, rgba(255,255,255,.09) 0 1px, transparent 1.5px) 0 0/42px 42px,
        radial-gradient(circle at 20% 80%, rgba(255,255,255,.06) 0 1px, transparent 1.5px) 0 0/34px 34px,
        linear-gradient(112deg, #142746 0%, #091d45 55%, #071839 100%);
    }
    .shell { width: min(656px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0 38px; }
    .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 21px; }
    .brand { display: flex; align-items: center; gap: 12px; color: white; }
    .brand-mark { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; background: linear-gradient(145deg,#ffe167,#d29d15); color: #101827; box-shadow: 0 5px 10px rgba(0,0,0,.18); font-size: 22px; }
    .brand-title { font-weight: 800; font-size: 13px; letter-spacing: .3px; line-height: 1.1; }
    .brand-sub { margin-top: 4px; color: #e8c75a; font-size: 9px; letter-spacing: 1.7px; }
    .step { border: 1px solid rgba(234,202,79,.55); border-radius: 999px; color: #f5d45e; padding: 6px 13px; font-size: 12px; font-weight: 700; }
    .progress { height: 6px; border-radius: 8px; background: rgba(255,255,255,.12); overflow: hidden; margin-bottom: 32px; }
    .progress span { display: block; width: 75%; height: 100%; border-radius: inherit; background: linear-gradient(90deg,#f8d854,#d9a918); }
    .panel { background: rgba(255,255,255,.98); border: 1px solid rgba(218,190,88,.7); border-radius: 20px 20px 0 0; padding: 37px 32px 31px; box-shadow: 0 18px 42px rgba(0,0,0,.13); }
    h1 { margin: 0 0 10px; font-size: 28px; line-height: 1.1; letter-spacing: -.8px; }
    .intro { margin: 0 0 24px; color: var(--muted); font-size: 16px; }
    .methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .method { appearance: none; min-height: 101px; border: 1px solid var(--line); background: white; border-radius: 18px; padding: 16px 8px 12px; cursor: pointer; transition: .18s ease; color: var(--ink); }
    .method:hover { transform: translateY(-2px); border-color: #c6a62d; box-shadow: 0 7px 16px rgba(22,31,54,.09); }
    .method.selected { border: 2px solid #d6af2d; background: #fffdf3; box-shadow: 0 0 0 3px rgba(233,198,64,.17); }
    .icon { width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; margin: 0 auto 8px; font-size: 23px; font-weight: 800; color: white; }
    .cash { background: #00ca59; } .zelle { background: #6820d7; } .apple { background: #050505; } .paypal { background:#0a3a92; } .venmo { background:#078ef0; } .chime { background:#1cc278; } .mail { background:#ce9d1d; } .wire { background:#102756; } .check { background:#f1d04e; color:#111; }
    .label { display: block; font-size: 12px; font-weight: 500; }
    .actions { display: flex; gap: 12px; margin-top: 24px; }
    .back, .continue { height: 52px; border-radius: 15px; font: inherit; font-weight: 700; cursor: pointer; }
    .back { width: 54px; border: 1px solid #f0d67a; background: white; color: #1e293b; font-size: 25px; }
    .continue { flex: 1; border: 0; color: #7c8597; background: linear-gradient(100deg,#fff0a9,#ddc480); opacity: .75; }
    .continue.active { color: #18233a; opacity: 1; box-shadow: 0 6px 13px rgba(200,158,38,.22); }
    .notice { display:none; margin-top: 14px; text-align:center; color:#7d6a25; font-size:12px; }
    @media (max-width: 560px) { .shell { padding-top: 24px; } .panel { padding: 28px 16px 22px; } .methods { gap: 8px; } .method { min-height: 94px; } h1 { font-size: 24px; } }
  
        .step3-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
      <main className="shell">
        <header className="topbar">
          <div className="brand"><div className="brand-mark">♛</div><div><div className="brand-title">YEARLY RELIEF</div><div className="brand-sub">GOLDEN ASSISTANCE</div></div></div>
          <div className="step">Step 3 of 4</div>
        </header>
        <div className="progress"><span></span></div>
        <section className="panel" aria-labelledby="title">
          <h1 id="title">Claim Your $10,000</h1>
          <p className="intro">How would you like to receive your payment?</p>
          <div className="methods" role="list">
            {methodsList.map((m) => (
              <button
                key={m.id}
                className={`method ${selected === m.id ? 'selected' : ''}`}
                onClick={() => handleSelect(m.id)}
                type="button"
              >
                <span className={`icon ${m.class}`}>{m.icon}</span>
                <span className="label">{m.id}</span>
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="back" aria-label="Go back" type="button" onClick={prevStep}>‹</button>
            <button
              className={`continue ${selected ? 'active' : ''}`}
              disabled={!selected}
              type="button"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
          {selected && (
            <div className="notice" style={{ display: 'block' }} aria-live="polite">
              Selected: {selected}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
