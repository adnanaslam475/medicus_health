import { CloseOutlined } from '@ant-design/icons'
import React from 'react'

type Props={
    disable:boolean
}
function MultiRangeListing(props:Props) {
    const {disable}=props
  return (

    <div className="flex  items-center">
    <div className="bg-gray-4 rounded-lg flex my-2 flex-1">
        <div className="flex flex-1 flex-col pl-5 pr-48 py-2 border-r border-gray-3">
            <span className="text-gray text-xs">Day</span>
            <span>Monday</span>
        </div>
        <div className="flex flex-1 flex-col pl-5 py-2 border-r border-gray-3">
            <span className="text-gray text-xs">To</span>
            <span>12:00am</span>
        </div>
        <div className="flex flex-1 flex-col pl-5  py-2">
            <span className="text-gray text-xs">To</span>
            <span>12:00pm</span>
        </div>
    </div>
    {disable == false && <CloseOutlined className="pl-1 "style={{color:"#D53E4F"}} />}
</div>
  )
}

export default MultiRangeListing