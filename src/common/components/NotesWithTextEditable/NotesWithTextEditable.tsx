import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React, { useState } from "react";
import _classes from "./NotesWithText.module.scss";
import { Appointment } from "generated/graphql";
import AcronymWithTextEditable from "../AcronymWithTextEditable/AcronymWithTextEditable";
import { Button, Form, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

type Props = {
	appointment?: Appointment | undefined;
	doctorNotes?: [[string, string]];
};

function NotesWithTextEditable({ appointment, doctorNotes }: Props) {
	const [edit, setEdit] = useState(false);
	const [noteType, setNoteType] = useState("");
	function handleChange(value: string) {
		setNoteType(value);
	}
	// onChange={handleChange}
	return (
		<>
			<CardWithProfileImageInfo
				name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
				serviceName={appointment?.serviceType?.name}
			>
				<div className="flex mb-8">
					<Select
						className="mr-5"
						placeholder="Select Notes Type"
						onChange={handleChange}
						style={{ width: 200 }}
					>
						<Select.Option value="narrative">NARRATIVE</Select.Option>
						<Select.Option value="soap">SOAP</Select.Option>
					</Select>
				</div>
				<h2>Add Note</h2>

				{noteType == "narrative" && (
					<>
						<h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">NARRATIVE</h4>
						{!edit ? (
							<Form.Item name="note">
								<TextArea />
							</Form.Item>
						) : (
							"Quisque auctor velit sed sapien laoreet accumsan. Donec congue felis sit amet libero laoreet tempor. Nunc tincidunt tristique magna, sed fringilla orci pulvinar quis. Aenean ligula ante, semper id libero vel, sollicitudin dictum dolor. Sed lobortis nulla felis, et imperdiet nibh luctus pretium. Vestibulum vitae tristique sem, nec semper quam. Aenean vitae dictum tortor. Ut arcu nulla, tristique quis bibendum vitae."
						)}
					</>
				)}
				{noteType == "soap" && (
					<>
						{" "}
						<h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
						{/* {doctorNotes?.length &&
          doctorNotes
            ?.filter((val) => val[0] !== "__typename")
            .map((item) => {
              let char = item[0].split("")[0];
              return (
                <AcronymWithText
                  character={char.toUpperCase()}
                  word={item[0]}
                  sentence={item[1]}
                />
              );
            })} */}
						<AcronymWithTextEditable
							character={"S"}
							editable={edit}
							word="Subjective"
							sentence={
								"Quisque auctor velit sed sapien laoreet accumsan. Donec congue felis sit amet libero laoreet tempor. Nunc tincidunt tristique magna, sed fringilla orci pulvinar quis. Aenean ligula ante, semper id libero vel, sollicitudin dictum dolor. Sed lobortis nulla felis, et imperdiet nibh luctus pretium. Vestibulum vitae tristique sem, nec semper quam. Aenean vitae dictum tortor. Ut arcu nulla, tristique quis bibendum vitae."
							}
						/>
						<AcronymWithTextEditable
							character={"O"}
							editable={edit}
							word="Objective"
							sentence={
								"Quisque pretium dapibus ipsum in interdum. Nullam luctus nisi nec finibus suscipit. Nunc bibendum ornare maximus. Quisque faucibus, dolor eget pharetra pretium, magna nunc imperdiet leo, ut pellentesque erat Leo vitae urna. Nulla nisl justo, euismod ac finibus eget, dictum eu magna."
							}
						/>
						<AcronymWithTextEditable
							character={"A"}
							editable={edit}
							word="Assessment"
							sentence={
								"Quisque pretium dapibus ipsum in interdum. Nullam luctus nisi nec finibus suscipit. Nunc bibendum ornare maximus. Quisque faucibus, dolor eget pharetra pretium, magna nunc imperdiet leo, ut pellentesque erat Leo vitae urna. Nulla nisl justo, euismod ac finibus eget, dictum eu magna. Cras semper aliquam nibh, vel molestie ex. Fusce ultrices odio a pharetra blandit. Nam ultrices, nisi viverra vehicula mattis, magna Leo feugiat."
							}
						/>
						<AcronymWithTextEditable
							character={"P"}
							editable={edit}
							word="Plan"
							sentence={
								"Curabitur consectetur commodo nunc, eu venenatis mi maximus at. Nulla rutrum tellus eu arcu feugiat varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
							}
						/>
					</>
				)}
			</CardWithProfileImageInfo>
			{edit ? (
				<div className="flex justify-end">
					<Button
						className="mt-2"
						onClick={() => {
							setEdit(!edit);
						}}
					>
						Edit
					</Button>
				</div>
			) : (
				<div className="flex justify-end">
					<Button className="mt-2" onClick={() => {
							setEdit(true);
						}}>Save</Button>
				</div>
			)}
		</>
	);
}

export default NotesWithTextEditable;
