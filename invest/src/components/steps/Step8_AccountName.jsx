import React, { useState } from 'react';
import { useStepper } from '../../context/StepperContext';

export const Step8_AccountName = () => {
  const { data, updateData, nextStep, goToStep } = useStepper();
  const [fullName, setFullName] = useState(data.fullName || '');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editVisible, setEditVisible] = useState(true);

  const displayEmail = data.email || 'treddquommaje-4676@yopmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = fullName.trim().split(/\s+/).length >= 2;
    if (!valid) {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
      setSuccess(true);
      updateData({ fullName: fullName.trim() });
      setTimeout(() => {
        nextStep();
      }, 500);
    }
  };

  return (
    <div className="step8-root">
      <style>{`

    .step8-root {
      --navy: #020817;
      --card: rgba(9, 24, 57, .86);
      --muted: #91a5ca;
      --white: #f7f9ff;
      --border: rgba(118, 146, 199, .25);
      --gold: #e9b839;
      --red: #b91536;
    }
    * { box-sizing: border-box; }
    .step8-root {
      margin: 0;
      min-height: 100vh;
      color: var(--white);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at 50% 26%, rgba(11, 28, 64, .42), transparent 34%),
        linear-gradient(112deg, #061a43 0%, #02081a 49%, #260018 100%);
      overflow-x: hidden;
    }
    .browser-bar { height: 48px; background: #292929; display: flex; align-items: center; padding: 0 16px; gap: 18px; color: #bdbdbd; }
    .browser-controls { display: flex; gap: 20px; font-size: 21px; }
    .address { height: 34px; flex: 1; max-width: 850px; background: #1f1f1f; border-radius: 18px; display: flex; align-items: center; padding: 0 16px; color: #ddd; font-size: 13px; letter-spacing: .1px; }
    .address span { color: #8795a7; margin-right: 9px; }
    .browser-icons { margin-left: auto; display: flex; gap: 18px; align-items: center; font-size: 17px; }
    main { min-height: calc(100vh - 48px); display: flex; flex-direction: column; align-items: center; padding: 72px 20px 60px; }
    .brand-mark { width: 81px; height: 81px; border-radius: 50%; display: grid; place-items: center; color: #060b18; font-size: 28px; font-weight: 700; background: linear-gradient(145deg, #ffdd70, #d5981f); box-shadow: 0 8px 28px rgba(226, 164, 44, .25); }
    h1 { margin: 18px 0 4px; font-size: 29px; letter-spacing: -.8px; text-shadow: 0 2px 4px rgba(0,0,0,.35); }
    .tagline { margin: 0; color: #9ab0d8; font-size: 16px; }
    .card { width: min(408px, 100%); margin-top: 35px; padding: 26px 24px 27px; border: 1px solid var(--border); border-radius: 24px; background: var(--card); box-shadow: 0 18px 50px rgba(0, 0, 0, .22); }
    h2 { margin: 0 0 5px; font-size: 20px; letter-spacing: -.3px; }
    .description { color: #9caed0; font-size: 14px; line-height: 1.45; margin: 0 0 22px; }
    .email { color: #f4f5ff; font-weight: 700; }
    label { display: block; font-size: 14px; font-weight: 700; margin-bottom: 7px; }
    input { width: 100%; height: 45px; padding: 0 12px; border-radius: 17px; border: 2px solid #826624; background: rgba(8, 22, 53, .8); color: white; outline: none; font-size: 14px; }
    input::placeholder { color: #9caed0; }
    input:focus { border-color: #e1b03a; box-shadow: 0 0 0 3px rgba(225,176,58,.13); }
    button { width: 100%; height: 46px; margin-top: 15px; border: 1px solid rgba(255, 160, 73, .55); border-radius: 16px; color: white; font-weight: 700; font-size: 14px; cursor: pointer; background: linear-gradient(100deg, #283160, #ad1631); transition: transform .15s, filter .15s; }
    button:hover { filter: brightness(1.14); transform: translateY(-1px); }
    .switch { display: block; margin-top: 21px; text-align: center; color: #9eb7df; font-size: 12px; text-decoration: underline; cursor: pointer; }
    .error, .success { display: none; margin-top: 10px; font-size: 13px; }
    .error { color: #ff9cae; } .success { color: #a9e7bb; }
    .chat { position: fixed; left: 16px; bottom: 96px; width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; border: 1px solid rgba(237, 184, 57, .55); background: linear-gradient(145deg, #a6284d, #16204c); box-shadow: 0 7px 18px rgba(0,0,0,.3); cursor: pointer; }
    .chat-icon { width: 22px; height: 19px; border: 2px solid white; border-radius: 50%; position: relative; }
    .chat-icon:after { content: ""; position: absolute; bottom: -5px; left: 2px; width: 7px; height: 7px; border-left: 2px solid white; transform: skew(-25deg); }
    .edit { position: fixed; right: 12px; bottom: 12px; background: #171717; color: #ddd; padding: 8px 10px; border-radius: 7px; font-size: 11px; box-shadow: 0 2px 6px #000; }
    .edit b { color: #ff927b; }
    .close { margin-left: 10px; color: #aaa; cursor: pointer; font-size: 15px; }
    @media (max-width: 650px) { .browser-bar { padding: 0 10px; gap: 8px; } .browser-controls { gap: 10px; } .browser-icons { display: none; } .address { font-size: 11px; } main { padding-top: 46px; } h1 { font-size: 25px; } }
  
        .step8-root {
          min-height: calc(100vh - 54px);
          width: 100%;
          position: relative;
        }
      `}</style>
      <div className="browser-bar" aria-hidden="true">
        <div className="browser-controls">‹ <span>›</span> ↻</div>
        <div className="address"><span>◉</span> smart-invest-network-wallet.com</div>
        <div className="browser-icons">⇩　☆　◩　♟　▣　❯　▱　◉　⋮</div>
      </div>

      <main>
        <div className="brand-mark">Si</div>
        <h1>Smart Invest Network</h1>
        <p className="tagline">DeFi Crypto Wallet</p>

        <section className="card" aria-labelledby="title">
          <h2 id="title">Enter your full name</h2>
          <p className="description">This is the name on your account for<br /><span className="email">{displayEmail}</span></p>
          <form id="nameForm" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="First and last name"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <button type="submit">Continue</button>
            <p className="error" id="error" style={{ display: error ? 'block' : 'none' }}>Please enter your full name.</p>
            <p className="success" id="success" style={{ display: success ? 'block' : 'none' }}>Thanks — your name has been saved.</p>
          </form>
          <a className="switch" id="switchEmail" onClick={() => goToStep(6)}>Use a different email</a>
        </section>
      </main>

      <button className="chat" aria-label="Open support chat" id="chat" type="button" onClick={() => alert('Support chat is opening soon.')}>
        <span className="chat-icon"></span>
      </button>


    </div>
  );
};
