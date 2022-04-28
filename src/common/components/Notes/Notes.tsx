import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import Image from 'next/image'
import React,{useState} from 'react'
import smile from '../../../../public/assets/images/smile.svg'
function Notes() {
    const [modalvisible,setModalVisible]=useState<boolean>(false)
  return (
  <>
  <div className='bg-gray-4 flex items-center justify-center flex-col py-6 border border-gray-9 rounded'>
         <Image
                    alt=""
                    className="success-icon mx-auto mt-10"
                    height={40}
                    width={40}
                    src={smile}
                  />
                  <p className='pt-2'>No notes to show</p>
                  <Button
                icon={<PlusOutlined />}
                className="text-primary"
                onClick={() => setModalVisible(true)}
              >
                Add
              </Button>
    </div>
      <Modal
      title="Add Note"
      centered
      visible={false}
    //   onOk={closeModal}
    //   onCancel={closeModal}
      footer={null}
    >
         <Form name="basic" layout="vertical">
   
        <Form.Item
          label=""
          name="firstName"
          rules={[{ required: true, message: "First Name!" }]}
          className="flex-1"
        >
          <Input />
        </Form.Item>
        </Form>
        </Modal>
        </>
  )
}

export default Notes