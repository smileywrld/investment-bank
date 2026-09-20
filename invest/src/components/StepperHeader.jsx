import React, { useState } from 'react';
import { useStepper } from '../context/StepperContext';

export const StepperHeader = () => {
  const { currentStep, totalSteps, stepTitles, goToStep, nextStep, prevStep } = useStepper();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (currentStep >= 10) {
    return null;
  }

  const percent = Math.round((currentStep / totalSteps) * 100);
  const currentTitle = stepTitles[currentStep - 1];

  return (
    <header id="master-stepper">
      <div className="stepper-nav-row">
        <div className="stepper-brand" onClick={() => goToStep(1)} title="Go to Step 1">
          <div className="stepper-badge">♔</div>
          <div className="stepper-titles">
            <div className="stepper-main-title">RELIEF <span>STEPPER</span></div>
            <div className="stepper-step-desc">{currentTitle}</div>
          </div>
        </div>

        <div className="stepper-center-info">
          <div className="stepper-progress-meta">
            <span className="stepper-current-pill">Step {currentStep} of {totalSteps}</span>
            <span className="stepper-percent-label">{percent}% Completed</span>
          </div>
          <div className="stepper-progress-track">
            <div
              className="stepper-progress-fill"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        <div className="stepper-actions">
          <button
            className="stepper-btn stepper-btn-prev"
            onClick={prevStep}
            disabled={currentStep === 1}
            title="Previous step (or Left Arrow)"
          >
            ‹ Prev
          </button>
          <button
            className="stepper-btn stepper-btn-next"
            onClick={nextStep}
            title="Next step (or Right Arrow)"
          >
            Next ›
          </button>
          <button
            className="stepper-toggle-steps"
            onClick={() => setDrawerOpen(!drawerOpen)}
            title="View all 16 steps"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Step Navigator Drawer */}
      <div id="stepper-drawer" className={drawerOpen ? 'open' : ''}>
        <div className="stepper-grid">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            return (
              <div
                key={stepNum}
                className={`step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  goToStep(stepNum);
                  setDrawerOpen(false);
                }}
              >
                <span className="step-node-num">{stepNum}</span>
                <span className="step-node-name" title={title}>{title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        #master-stepper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 99999;
          background: var(--stepper-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--stepper-border);
          box-shadow: 0 4px 28px rgba(0, 0, 0, 0.6);
          transition: all 0.3s ease;
        }

        .stepper-nav-row {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .stepper-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
        }
        .stepper-badge {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #ffe167, #d29d15);
          color: #0d121c;
          display: grid;
          place-items: center;
          font-size: 18px;
          font-weight: 800;
          box-shadow: 0 0 14px var(--stepper-gold-glow);
        }
        .stepper-titles {
          display: flex;
          flex-direction: column;
        }
        .stepper-main-title {
          font-size: 13px;
          font-weight: 850;
          letter-spacing: 0.5px;
          color: #fff;
        }
        .stepper-main-title span {
          color: var(--stepper-gold);
        }
        .stepper-step-desc {
          font-size: 11px;
          color: var(--stepper-muted);
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stepper-center-info {
          flex: 1;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .stepper-progress-meta {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
          color: #c7d4ea;
        }
        .stepper-current-pill {
          background: rgba(229, 184, 47, 0.16);
          border: 1px solid rgba(229, 184, 47, 0.4);
          padding: 2px 10px;
          border-radius: 12px;
          color: #ffd95d;
          font-size: 11px;
        }
        .stepper-percent-label {
          color: var(--stepper-muted);
          font-size: 11px;
        }

        .stepper-progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }
        .stepper-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffe26d, #d69818, #3b82f6);
          border-radius: inherit;
          box-shadow: 0 0 12px rgba(229, 184, 47, 0.5);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stepper-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .stepper-btn {
          height: 34px;
          padding: 0 14px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
          user-select: none;
          border: 0;
        }
        .stepper-btn-prev {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #c0cadb;
        }
        .stepper-btn-prev:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.16);
          color: #fff;
        }
        .stepper-btn-next {
          background: linear-gradient(135deg, #f7d558, #c99313);
          color: #0b111e;
          box-shadow: 0 2px 10px rgba(214, 157, 21, 0.3);
        }
        .stepper-btn-next:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .stepper-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none !important;
        }

        .stepper-toggle-steps {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #c7d2e4;
          display: grid;
          place-items: center;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .stepper-toggle-steps:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        #stepper-drawer {
          max-height: 0;
          overflow: hidden;
          background: rgba(4, 10, 24, 0.98);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        #stepper-drawer.open {
          max-height: 240px;
          overflow-y: auto;
        }
        .stepper-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 18px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
          gap: 8px;
        }
        .step-node {
          padding: 7px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #9ab0d2;
          transition: all 0.2s ease;
        }
        .step-node:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(229, 184, 47, 0.35);
          color: #fff;
        }
        .step-node.active {
          background: rgba(229, 184, 47, 0.14);
          border-color: #d8a623;
          color: #ffe074;
          font-weight: 700;
        }
        .step-node.completed {
          border-color: rgba(62, 166, 255, 0.4);
          color: #b5d5ff;
        }
        .step-node-num {
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: grid;
          place-items: center;
          font-size: 10px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .step-node.active .step-node-num {
          background: #d8a623;
          color: #0b111e;
        }
        .step-node.completed .step-node-num {
          background: #2563eb;
          color: #fff;
        }
        .step-node-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .stepper-nav-row {
            padding: 8px 12px;
            gap: 10px;
          }
          .stepper-main-title {
            font-size: 12px;
          }
          .stepper-step-desc {
            display: none;
          }
          .stepper-center-info {
            max-width: 240px;
          }
          .stepper-btn {
            padding: 0 9px;
            font-size: 11px;
          }
        }
        @media (max-width: 480px) {
          .stepper-center-info {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
