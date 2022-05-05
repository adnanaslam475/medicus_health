import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import Image from 'next/image'
import React,{useState} from 'react'
import smile from '../../../../public/assets/images/smile.svg'
import Acromyum from '../Acronyum/Acromyum'
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
      visible={true}
    //   onOk={closeModal}
    //   onCancel={closeModal}
      footer={null}
    >
        <Acromyum/>
        </Modal>
        </>
  )
}

export default Notes