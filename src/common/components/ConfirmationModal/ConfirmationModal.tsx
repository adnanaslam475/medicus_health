import React from "react";
import { Modal } from "antd";
type Props = {
  visible: boolean;
  onCancel?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  message: string;
  confirmLoading: boolean;
};
const ConfirmationModal = ({
  message,
  onCancel,
  onOk,
  visible,
  confirmLoading,
}: Props) => {
  return (
    <Modal
      onCancel={onCancel}
      title=""
      confirmLoading={confirmLoading}
      onOk={onOk}
      visible={visible}
    >
      <p>{message}</p>
    </Modal>
  );
};
export default ConfirmationModal;
