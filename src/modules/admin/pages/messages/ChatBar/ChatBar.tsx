import React from 'react'
import Chat from './Chat/Chat'

type Props={
    className:string
    bgColor:string
}
function ChatBar(props:Props) {
    const {className,bgColor}=props
  return (
    <div className='p-4'><Chat className={className} bgColor={bgColor}/></div>
  )
}

export default ChatBar