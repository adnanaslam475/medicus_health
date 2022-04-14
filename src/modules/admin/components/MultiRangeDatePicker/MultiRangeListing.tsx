import { CloseOutlined } from '@ant-design/icons'
import React from 'react'

function MultiRangeListing() {
  return (
    <div className="flex items-center">
    <div className="bg-gray-4 rounded-lg flex my-2">
        <div className="flex flex-col pl-5 pr-24 py-2 border-r border-gray-3">
            <span className="text-gray text-xs">Day</span>
            <span>Monday</span>
        </div>
        <div className="flex flex-col pl-5 pr-12 py-2 border-r border-gray-3">
            <span className="text-gray text-xs">To</span>
            <span>12:00am</span>
        </div>
        <div className="flex flex-col pl-5 pr-12 py-2">
            <span className="text-gray text-xs">To</span>
            <span>12:00pm</span>
        </div>
    </div>
    <CloseOutlined style={{color:"red"}} />
</div>
  )
}

export default MultiRangeListing