import { Radio } from 'antd'
import Image from 'next/image';
import React from 'react';
import visa from './../../../../../public/assets/images/visa.svg'

function MakePayment() {
  return (
    <div >
        <div className='bg-gray-4 flex items-center py-1'>
            <Radio>aaa</Radio>
            <div className="bg-white rounded px-2">
            <Image
                  alt=""
                  src={visa}
                  width={46}
                  height={34}
                  className="border rounded border-gray-2"
                />
</div>
<div>
    <h4>Visa Ending with 2256</h4>
    <p>Expires: 05/2026</p>
</div>
        </div>
    </div>
  )
}

export default MakePayment