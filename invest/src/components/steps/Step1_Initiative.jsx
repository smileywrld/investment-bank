import React, { useState } from 'react';
import { useStepper } from '../../context/StepperContext';

export const Step1_Initiative = () => {
  const { nextStep } = useStepper();
  const [started, setStarted] = useState(false);

  const handleBegin = () => {
    setStarted(true);
    setTimeout(() => {
      nextStep();
    }, 450);
  };

  return (
    <div className="step1-root">
      <style>{`

    .step1-root {
      --navy: #071b42;
      --navy-deep: #051635;
      --gold: #d6a915;
      --gold-light: #ffe477;
      --ink: #111827;
      --muted: #56647c;
      --card: #fffdfb;
    }

    * { box-sizing: border-box; }
    .step1-root {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at 20% 10%, rgba(44, 83, 145, .24) 1px, transparent 1px) 0 0 / 22px 22px,
        radial-gradient(circle at 80% 50%, rgba(44, 83, 145, .18) 1px, transparent 1px) 0 0 / 28px 28px,
        linear-gradient(135deg, var(--navy-deep), var(--navy));
      padding: 42px 22px 58px;
    }

    .shell { max-width: 680px; margin: 0 auto; }
    .topbar { color: white; margin-bottom: 31px; }
    .brand-row { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
    .brand { display: flex; align-items: center; gap: 13px; }
    .brand-mark {
      width: 38px; height: 38px; display: grid; place-items: center;
      color: #111827; background: linear-gradient(145deg, #ffe477, #c89706);
      border-radius: 11px; font-size: 22px; box-shadow: 0 5px 15px rgba(0,0,0,.22);
    }
    .brand-title { font-size: 14px; font-weight: 850; letter-spacing: .02em; }
    .brand-title span { color: #ffd544; }
    .brand-subtitle { display: block; margin-top: 2px; color: #c8d1e4; font-size: 9px; letter-spacing: .2em; }
    .step { border: 1px solid rgba(226,184,47,.55); color: #ffe477; border-radius: 20px; padding: 5px 13px; font-size: 11px; font-weight: 700; white-space: nowrap; }
    .progress { height: 6px; margin-top: 15px; border-radius: 9px; background: rgba(255,255,255,.16); overflow: hidden; }
    .progress span { display: block; width: 25%; height: 100%; background: linear-gradient(90deg, #ffe477, #bc8a03); border-radius: inherit; }

    .card {
      background: var(--card); border: 1px solid rgba(203, 165, 47, .58); border-radius: 20px;
      padding: 28px 32px 32px; text-align: center; box-shadow: 0 18px 40px rgba(0,0,0,.22);
    }
    .seal { width: 73px; height: 73px; display: grid; place-items: center; margin: 0 auto 14px; border-radius: 50%; border: 7px solid #f4e5ae; background: #d6a915; color: #101827; font-size: 35px; box-shadow: inset 0 0 0 2px rgba(255,255,255,.2); }
    .badge { display: inline-block; padding: 5px 12px; border-radius: 20px; color: #936d03; background: #fff5d5; font-size: 10px; font-weight: 700; letter-spacing: .05em; }
    h1 { max-width: 500px; margin: 19px auto 21px; font-size: clamp(27px, 5vw, 32px); line-height: 1.15; letter-spacing: -.035em; }
    .intro { max-width: 565px; margin: 0 auto 28px; color: var(--muted); font-size: 15.5px; line-height: 1.65; }
    .button { width: 100%; border: 0; border-radius: 14px; padding: 16px; color: #111827; background: linear-gradient(100deg, #ffe477, #c58d05); font-size: 14px; font-weight: 800; cursor: pointer; box-shadow: 0 12px 25px rgba(195, 146, 15, .25); transition: transform .2s, filter .2s; }
    .button:hover { transform: translateY(-2px); filter: brightness(1.04); }
    .button:active { transform: translateY(0); }
    .trust { display: flex; justify-content: center; gap: 18px; flex-wrap: wrap; margin-top: 17px; color: #768094; font-size: 10px; }
    .trust span::first-letter { color: #bd8b0a; }
    .notice { display: none; margin-top: 18px; padding: 12px; border-radius: 10px; color: #6f5605; background: #fff7d8; font-size: 13px; }
    .notice.visible { display: block; }
    @media (max-width: 520px) { .step1-root { padding: 25px 14px 35px; } .card { padding: 26px 20px 25px; } .brand-row { align-items: flex-start; } .step { font-size: 10px; } .intro { font-size: 14px; } }
  
        .step1-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
      <main className="shell">
        <header className="topbar">
          <div className="brand-row">
            <div className="brand">
              <div className="brand-mark" aria-hidden="true">♔</div>
              <div><div className="brand-title">YEARLY <span>RELIEF</span></div><small className="brand-subtitle">GOLDEN ASSISTANCE</small></div>
            </div>
            <div className="step">Step 1 of 4</div>
          </div>
          <div className="progress" aria-label="Application progress"><span></span></div>
        </header>

        <section className="card" aria-labelledby="page-title">
          <div className="seal" aria-hidden="true">✿</div>
          <div className="badge">✣ &nbsp; VERIFIED PROGRAM · 2026</div>
          <h1 id="page-title">Yearly Relief Financial<br />Assistance Initiative</h1>
          <p className="intro">The Yearly Relief Financial Assistance Initiative was established with the sole purpose of providing meaningful financial support to individuals and families experiencing economic hardship. This program helps ease burdens by assisting with bill payments, debt settlement, and essential expenses. Upon successful receipt of your funds, we encourage you to share this positive news responsibly so others may benefit from the initiative.</p>
          <button className="button" id="begin" onClick={handleBegin}>
            {started ? 'Application Started' : 'Begin Application'}
          </button>
          <div className={`notice ${started ? 'visible' : ''}`} id="notice" role="status">
            Application access is ready. The next step can be connected to your application form.
          </div>
          <div className="trust" aria-label="Security assurances">
            <span>♧ SSL Secured</span><span>♧ Private</span><span>✥ Verified</span>
          </div>
        </section>
      </main>
    </div>
  );
};
