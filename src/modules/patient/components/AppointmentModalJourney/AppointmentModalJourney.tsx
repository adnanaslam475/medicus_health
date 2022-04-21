import { Modal } from "antd";
import React, { useState } from "react";
import AppointmentModalFooter from "./AppointmentModalFooter/AppointmentModalFooter";
import CurrentStepContent from "./CurrentStepContent/CurrentStepContent";

type Props = {
	visible?: boolean | undefined;
	onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
	onCancel?:
		| ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
		| undefined;
};
function AppointmentModalJourney({ visible, onOk, onCancel }: Props) {
	return <AppointmentModal visible={visible} onOk={onOk} onCancel={onCancel} />;
}

function AppointmentModal({ visible, onOk, onCancel }: Props) {
	const [currentStepName, setCurrentStepName] = useState<string>("stepOne");
	const [currentStepNumber, setCurrentStepNumber] = React.useState<number>(0);

	const next = (stepName: string) => {
		if (stepName === "stepFour") return;
		if (stepName === "stepOne") {
			setCurrentStepName("stepTwo");
		} else if (stepName === "stepTwo") {
			setCurrentStepName("stepThree");
		} else if (stepName === "stepThree") {
			setCurrentStepName("stepFour");
		}
		setCurrentStepNumber((prev) => prev + 1);
	};
	const prev = (stepName: string) => {
		if (stepName === "stepOne") return;
		else if (stepName === "stepTwo") {
			setCurrentStepName("stepOne");
		} else if (stepName === "stepThree") {
			setCurrentStepName("stepTwo");
		} else if (stepName === "stepFour") {
			setCurrentStepName("stepThree");
		}
		setCurrentStepNumber((prev) => prev - 1);
	};

	async function onRequestAppointment() {
		try {
		} catch (error) {}
	}

	return (
		<Modal
			centered
			maskClosable={false}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			footer={null}
			width={368}
		>
			<>
				<h1>{}</h1>
				<div className="steps-content">
					<CurrentStepContent stepName={currentStepName} />
				</div>

				<AppointmentModalFooter
					stepName={currentStepName}
					onNext={() => next(currentStepName)}
					onPrevious={() => prev(currentStepName)}
					onRequestAppointment={onRequestAppointment}
					setCurrentStepName={setCurrentStepName}
				/>
			</>
		</Modal>
	);
}

export default AppointmentModalJourney;
