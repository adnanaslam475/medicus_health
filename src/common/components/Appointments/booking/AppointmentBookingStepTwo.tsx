import React, { useEffect, useState } from "react";
import { Checkbox, Upload, Form, UploadProps, notification } from "antd";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import Image from "next/image";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import GeneralHealthQuesionnairModal from "./GeneralHealthQuesionnairModal";
import {
	Appointment,
	DoctorProfile,
	usePatientHealthHistoryQuery,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import pdf from "../../../../../public/assets/images/word-file.svg";
import jpg from "../../../../../public/assets/images/jpg.svg";
import png from "../../../../../public/assets/images/png.png";
import zip from "../../../../../public/assets/images/zip.png";
import docx from "../../../../../public/assets/images/docx.png";
import doc from "../../../../../public/assets/images/doc.jpg";
import tiff from "../../../../../public/assets/images/tiff.png";
import bmp from "../../../../../public/assets/images/bmp.png";
import tga from "../../../../../public/assets/images/tga.png";

const { Dragger } = Upload;
type Props = {
	physicianData?: DoctorProfile | undefined | null;
	adminApp_Details?: DoctorData;
	rebookData?: Appointment;
	clear?: boolean | undefined;
};

type DoctorData = {
	doctor: {
		doctor_Id: number;
		doctor_first_name: string;
		doctor_last_name: string;
	};
	patient: {
		patient_id: number;
	};
};

const StepTwo = React.forwardRef(function StepTwo(props: Props, ref: any) {
	const { data, saveStepTwo } = useBookAppointment();
	const { physicianData, adminApp_Details, rebookData, clear } = props || {};
	const { user } = getUserData();
	const [formInstance] = Form.useForm();

	const [fileList, setFileList] = useState([]);
	const patientId =
		rebookData?.patientId || user?.role === "User"
			? Number(user?.id)
			: Number(data?.stepOne?.patient?.split(":")[0]);
	const [{ data: patientHealthData }] = usePatientHealthHistoryQuery({
		variables: { input: patientId },
		pause: !patientId,
	});
	const { patientHealthHistory } = patientHealthData || {};
	const [checked, setChecked] = useState(
		data?.stepTwo?.length > 0 ? false : true
	);

	const attachmentProps: UploadProps | Object = {
		accept:
			".doc,.docx,.pdf,.zip,.tiff,.tga,image/jpg,image/jpeg,image/jpg,image/bmp,image/x-tga,image/png,image/tga,application/msword,",
		name: "file",
		multiple: true,
		onChange(info: { file: { name?: string; size: number }; fileList: any }) {
			let fileListing = info.fileList;

			const availableTypes: Object = {
				"application/pdf": pdf.src,
				"application/msword": doc.src,
				"application/doc": doc.src,
				"application/docx": docx.src,
				"application/x-zip-compressed": zip.src,
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
					docx.src,
				"image/jpeg": jpg.src,
				"image/png": png.src,
				"image/tiff": tiff.src,
				"image/x-tga": tga.src,
				"image/targa": tga.src,
				"image/bmp": bmp.src,
				"application/zip": zip.src,
			};
			const stepTwoFiles = fileListing?.map((item: any) => {
				return {
					...item,
					thumbUrl:
						availableTypes[item.type as keyof typeof availableTypes] || pdf.src,
				};
			});
			let in10MBLimit = info?.file?.size / 1024 / 1024 < 10;
			if (in10MBLimit) {
				setFileList(stepTwoFiles);
				saveStepTwo?.(stepTwoFiles);
			} else notification.error({ message: "File must smaller than 10 MB!" });
		},
		defaultFileList: data?.stepTwo && data?.stepTwo,
		fileList: data?.stepTwo || fileList,
		onDrop(e: { dataTransfer: { files: any } }) {
			// saveStepTwo?.(e.dataTransfer.files);
		},
		showUploadList: {
			showRemoveIcon: true,
			removeIcon: "X",
		},
	};

	function onFinishLocal() {
		saveStepTwo?.(data?.stepTwo || fileList);
	}

	useEffect(() => {
		if (ref) {
			ref.current = formInstance;
		}
	}, []);

	// useEffect(() => {
	//   if (clear) {
	//     formInstance.resetFields();
	//   }
	// }, [data.stepThree, clear]);

	const handlechecked = (e: CheckboxChangeEvent) => {
		setChecked(e.target.checked);
	};

	const [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<>
			<h2>Request an appointment</h2>
			<Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
				<Form.Item label="Medical history*">
					<Dragger
						{...attachmentProps}
						customRequest={({ onSuccess }) => onSuccess?.({})}
						listType="picture"
					>
						<p className="ant-upload-drag-icon mb-0">
							<Image
								priority={true}
								alt=""
								className=""
								height={32}
								width={36}
								src="/assets/icon/upload-icon.svg"
							/>
						</p>
						<span className="ant-upload-text text-sm block">
							Drag your files here or
						</span>
						<span className="font-circular text-xs ant-upload-text text-white p-1 px-3 mt-1 mb-3 rounded inline-block bg-primary">
							Upload
						</span>
						<span className=" ant-upload-hint block text-xs text-gray-1">
							Max 10mb upload limit.
						</span>
					</Dragger>
				</Form.Item>
				<Form.Item
					label="Health questionnaire*"
					name="questionnair"
					rules={[
						{
							required: !patientHealthHistory?.id ? true : false,
							message: "General health questionnaire is required",
						},
					]}
				>
					<div className="w-full bg-gray-4 rounded flex items-center p-3">
						<Checkbox
							onChange={handlechecked}
							defaultChecked={patientHealthHistory?.id ? true : false}
							disabled={true}
						>
							<span className="text-gray-2">
								Health questionnaire is attached
							</span>
						</Checkbox>
					</div>
				</Form.Item>
				<p className="text-gray-2">
					If you wish to update the make changes in your current health
					questionnaire,
					<a onClick={() => setIsModalVisible(true)}>Click here.</a>
				</p>
			</Form>
			{isModalVisible && (
				<GeneralHealthQuesionnairModal
					setIsModalVisible={setIsModalVisible}
					isModalVisible={isModalVisible}
					ref={ref}
					physicianData={physicianData}
					adminApp_Details={adminApp_Details}
					rebookData={rebookData}
				/>
			)}
		</>
	);
});

export default StepTwo;
