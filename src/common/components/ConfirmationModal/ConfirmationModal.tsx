import React from "react";
import { Modal } from "antd";
type Props = {
  visible: boolean;
  onCancel?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  message: string;
  confirmLoading?: boolean | undefined;
  footer?: boolean | undefined;
};
const ConfirmationModal = ({
  message,
  onCancel,
  onOk,
  visible,
  confirmLoading,
  footer,
}: Props) => {
  return (
    <>
      {footer ? (
        <Modal
          onCancel={onCancel}
          title=""
          confirmLoading={confirmLoading}
          onOk={onOk}
          visible={visible}
          className="imtiasz"
        >
          <p>{message}</p>
        </Modal>
      ) : (
        <Modal
          onCancel={onCancel}
          title=""
          confirmLoading={confirmLoading}
          onOk={onOk}
          visible={visible}
          className="imtiasz"
          footer={null}
        >
          <p>{message}</p>
        </Modal>
      )}
    </>
  );
};
export default ConfirmationModal;
