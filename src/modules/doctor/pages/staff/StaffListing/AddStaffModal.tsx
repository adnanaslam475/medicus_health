import React from "react";
import { Modal, Form, Button, Input, FormProps, FormInstance } from "antd";
import { UpdateStaffInput } from "generated/graphql";import _classes from "./_staff.module.scss";
import AddStaffFormItems from "common/components/AddStaffFormItems/AddStaffFormItems";

type AddStaffModalProps = {
  visibleModal: boolean | undefined;
  fetching: boolean | undefined;
  onFinish: (data: UpdateStaffInput) => void;
  form?: FormInstance | null;
  closeModal: () => void;
};

const AddStaffModal = React.forwardRef(
  (
    { closeModal, form, visibleModal, onFinish, fetching }: AddStaffModalProps,
    ref
  ) => {
    return (
      <Modal
        centered
        width={700}
        visible={visibleModal}
        onCancel={closeModal}
        footer={null}
      >
        <h1>Add Staff</h1>
        <Form onFinish={onFinish} form={form as FormInstance} layout="vertical">
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            <AddStaffFormItems />
          </div>
          <div className="flex justify-end pb-0">
            <Form.Item noStyle>
              <Button
                loading={fetching}
                disabled={fetching}
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
