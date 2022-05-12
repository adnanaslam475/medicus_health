import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import CardWithProfileImageInfo from "modules/doctor/pages/PhysicianAppointmentHistoryDetail/CardWithProfileImageInfo";
import Image from "next/image";
import React, { useState } from "react";
import smile from "../../../../public/assets/images/smile.svg";
import AcromyumWithText from "../AcronyumWithText/AcromyumWithText";
import _classes from "./NotesWithText.module.scss";
function Notes() {
	const [modalvisible, setModalVisible] = useState<boolean>(false);
	const closeModal = () => {
		setModalVisible(false);
	};
	return (
		<>
			<CardWithProfileImageInfo
				name="usama khan"
				serviceName="consultatiion"
				
			>
			<h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
			<AcromyumWithText
				character="s"
				word="subject"
				sentence="Quisque auctor velit sed sapien laoreet accumsan. Donec congue felis sit amet libero laoreet tempor. Nunc tincidunt tristique magna, sed fringilla orci pulvinar quis. Aenean ligula ante, semper id libero vel, sollicitudin dictum dolor. Sed lobortis nulla felis, et imperdiet nibh luctus pretium. Vestibulum vitae tristique sem, nec semper quam. Aenean vitae dictum tortor. Ut arcu nulla, tristique quis bibendum vitae."
			/>
			<AcromyumWithText
				character="s"
				word="subject"
				sentence="Quisque pretium dapibus ipsum in interdum. Nullam luctus nisi nec finibus suscipit. Nunc bibendum ornare maximus. Quisque faucibus, dolor eget pharetra pretium, magna nunc imperdiet leo, ut pellentesque erat Leo vitae urna. Nulla nisl justo, euismod ac finibus eget, dictum eu magna."
			/>
			<AcromyumWithText
				character="s"
				word="subject"
				sentence="Curabitur consectetur commodo nunc, eu venenatis mi maximus at. Nulla rutrum tellus eu arcu feugiat varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
			/>
			<AcromyumWithText
				character="s"
				word="subject"
				sentence="SubjCurabitur consectetur commodo nunc, eu venenatis mi maximus at. Nulla rutrum tellus eu arcu feugiat varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra.ective"
			/>
			</CardWithProfileImageInfo>
		</>
	);
}

export default Notes;
