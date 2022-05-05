import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Image from "next/image";
import React, { useState } from "react";
import smile from "../../../../public/assets/images/smile.svg";
import Acromyum from "../Acronyum/Acromyum";
import _classes from "./Notes.module.scss";
function Notes() {
	const [modalvisible, setModalVisible] = useState<boolean>(false);
	const closeModal = () => {
		setModalVisible(false);
	};
	return (
		<>
			<div className="bg-gray-4 flex items-center justify-center flex-col py-6 border border-gray-9 rounded">
				<Image
					alt=""
					className="success-icon mx-auto mt-10"
					height={40}
					width={40}
					src={smile}
				/>
				<p className="pt-2">No notes to show</p>
				<Button
					icon={<PlusOutlined />}
					className={`${_classes["custom-button-green"]}`}
					onClick={() => setModalVisible(true)}
				>
					Add
				</Button>
			</div>
			<Modal
				width={700}
				title=""
				centered
				visible={modalvisible}
				onCancel={closeModal}
				footer={null}
				className={`${_classes["modal-custom"]}`}
			>
				<h4 className="font-bold pt-4">Add Note</h4>
				<TextArea />
				<h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
				<Acromyum character="s" word="Subjective" />
				<Acromyum character="s" word="Subjective" />
				<Acromyum character="s" word="Subjective" />
				<Acromyum character="s" word="Subjective" />
				<div className="flex justify-end gap-2">
					<Button>Publish Notes</Button>
					<Button type="primary" className={`${_classes["custom-button"]}`}>
						Save Notes
					</Button>
				</div>
			</Modal>
		</>
	);
}

export default Notes;
