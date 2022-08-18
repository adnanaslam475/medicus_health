import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Image from "next/image";
import React, { useRef, useState } from "react";
import smile from "../../../../public/assets/images/smile.svg";
import Acronym from "common/components/Acronym/Acronym";
import _classes from "./Notes.module.scss";

type Props = {
  onFinish?: (values: any, setModalVisible: () => void) => void;
  disabled?: boolean;
};

function Notes(props: Props) {
  const [formInstance] = Form.useForm();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { onFinish, disabled } = props;
  const closeModal = () => {
    setModalVisible(false);
    formInstance.resetFields();
  };

  function onFinishLocal(values: any) {
    onFinish?.(values, closeModal);
  }

  const publishRef = useRef({
    isPublish: false,
  });

  return (
    <>
      <div className="bg-gray-4 flex items-center justify-center flex-col py-6 border border-gray-9 rounded">
        <Image
          priority={true}
          alt=""
          className="success-icon mx-auto mt-10"
          height={40}
          width={40}
          src={smile}
        />
        {/* <p className="pt-2">No notes to show</p> */}
        <p className="pt-2">Add notes</p>
        <Button
          icon={<PlusOutlined className="-mt-2" />}
          className={`${_classes["custom-button-green"]}`}
          onClick={() => setModalVisible(true)}
          disabled={disabled}
        >
          Add
        </Button>
      </div>
      <Modal
        width={700}
        title=""
        centered
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        className={`${_classes["modal-custom"]}`}
      >
        <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
          <h4 className="font-bold pt-4">Add note</h4>
          <h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">NARRATIVE</h4>
          <Form.Item name="note">
            <TextArea />
          </Form.Item>
          <h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
          <Acronym character="S" word="Subjective" />
          <Acronym character="O" word="Objective" />
          <Acronym character="A" word="Assessment" />
          <Acronym character="P" word="Plan" />
          <div className="flex justify-end gap-2">
            {/* <Button
              htmlType="submit"
              onClick={() => {
                // setLoaderSave(true);
                publishRef.current.isPublish = true;
              }}
            >
              Publish Notes
            </Button> */}
            <Button
              htmlType="submit"
              type="primary"
              className={`${_classes["custom-button"]}`}
            >
              Save notes
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Notes;
