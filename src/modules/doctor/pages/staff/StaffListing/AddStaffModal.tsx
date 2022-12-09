import React from "react";
import { Modal, Form, Button, FormInstance } from "antd";
import { UpdateStaffInput } from "generated/graphql";
import AddStaffFormItems from "common/components/AddStaffFormItems/AddStaffFormItems";

// scss
import _classes from "./StaffListing.module.scss";
import { isChrome } from "utils/helper";

type AddStaffModalProps = {
  visibleModal: boolean | undefined;
  fetching: boolean | undefined;
  onFinish: (data: UpdateStaffInput) => void;
  form?: FormInstance | null;
  closeModal: () => void;
};

const AddStaffModal = React.forwardRef(function AddStaffModal(
  { closeModal, form, visibleModal, onFinish, fetching }: AddStaffModalProps,
  ref
) {
  return (
    <Modal
      centered
      width={700}
      visible={visibleModal}
      onCancel={closeModal}
      footer={null}
      className={`${_classes["staff-Modal"]}`}
    >
      <h1>Add staff</h1>
      <Form onFinish={onFinish} form={form as FormInstance} layout="vertical">
        <div className="md:grid md:grid-cols-2 md:gap-x-4">
          <AddStaffFormItems />
        </div>
        <div className="mt-2 md:mt-0 flex justify-end pb-0">
          <Form.Item noStyle>
            <Button
              loading={fetching}
              disabled={fetching}
              type="primary"
              htmlType="submit"
              className={`ml-4 py-2 ${isChrome && 'antCustomBtn'}`}
            >
              Add staff
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
});
export default AddStaffModal;
