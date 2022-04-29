import React from 'react'

type Props={
    label:string,
    text:string,

}

function LabelWithText(props:Props) {
    const {label,text}=props
  return (
    <div>
        <div className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">{label}</div>
          <div className="w-full text-secondary">{text}</div>
        </div>
    </div>
  )
}

export default LabelWithText