import Image from 'next/image'
import React from 'react'
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import ThreeDot from "./../../../../../../public/assets/images/threedot.svg";

function ChatHeader() {
  return (
    <div className="flex justify-between  p-4 gap-2 items-center border-b border-gray-4">
    <div className="flex items-center gap-2">
        <Image alt="" width={39} height={39} src={profile} />
        <h4 className="pb-0 mb-0">Mark Manson</h4>
    </div>
    <Image alt="" width={20} height={30} src={ThreeDot} />
</div>
  )
}

export default ChatHeader