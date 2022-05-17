import React from "react";
import { Modal, Form, Button, Input, FormProps, FormInstance } from "antd";
import { createStaffForm } from "utils/helper";
import _classes from "./_staff.module.scss";
import { UpdateStaffInput } from "generated/graphql";

type AddStaffModalProps = {
  showModal: boolean | undefined;
  loadingSubmit: boolean | undefined;
  handleSubmit: (data: UpdateStaffInput) => void;
  form?: FormInstance | null;
  closeModal: () => void;
};

const AddStaffModal = React.forwardRef(
  (
    {
      closeModal,
      form,
      showModal,
      handleSubmit,
      loadingSubmit,
    }: AddStaffModalProps,
    ref
  ) => {
    return (
      <Modal
        centered
        width={700}
        visible={showModal}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          onFinish={handleSubmit}
          form={form as FormInstance}
          layout="vertical"
        >
          <h1>Add Staff</h1>
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            {createStaffForm.map((value, i) => (
              <Form.Item
                key={i}
                label={value.label}
                rules={[
                  {
                    required: value.required,
                    message: `Please fill ${value.label}`,
                  },
                ]}
                className={`font-bold ${_classes["clr-black"]}`}
                name={value.name}
              >
                <Input placeholder="" className="" />
              </Form.Item>
            ))}
          </div>
          <div className="flex justify-end pb-0">
            <Form.Item noStyle>
              <Button
                loading={loadingSubmit}
                disabled={loadingSubmit}
                type="primary"
                htmlType="submit"
                className={`ml-4 py-2`}
              >
                Add Staff
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
);
export default AddStaffModal;
