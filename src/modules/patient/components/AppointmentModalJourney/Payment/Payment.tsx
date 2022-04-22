import { Radio } from 'antd'
import Image from 'next/image'
import React from 'react'

type Props={
    visa:StaticImageData
}
function Payment(props:Props) {
    const{visa}=props;
    
  return (
    <div className="bg-gray-4 flex items-center py-3 px-3 pr-10 rounded my-3">
    <Radio></Radio>
    <div className="bg-white rounded px-2 pb-0 mb-0 pt-2">
        <Image
            alt=""
            src={visa}
            width={46}
            height={24}
            className="border rounded border-gray-2"
        />
    </div>
    <div className="px-2">
        <h6 className="pb-0 mb-0">Visa Ending with 2256</h6>
        <p className="mb-0 text-sm">Expires: 05/2026</p>
    </div>
</div>
  )
}

export default Payment