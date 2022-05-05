import TextArea from 'antd/lib/input/TextArea'
import React from 'react'

function Acromyum() {
  return (
    <div>
        <div className='flex w-full gap-2'>
            <span className='text-base font-bold rounded text-primary  h-full px-2 bg-lightBlue'>S</span>
            <div className='w-full'>
                <span className='text-lg font-medium'>Subjective</span>
                <TextArea/>
            </div>
        </div>
    </div>
  )
}

export default Acromyum