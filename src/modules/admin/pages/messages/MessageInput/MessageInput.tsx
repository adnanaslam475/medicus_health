
import { Input } from 'antd';
import Image from 'next/image';
import React from 'react';
import _classes from './MessageInput.module.scss';
import attachIcon from './../../../../../../public/assets/images/attach.svg';
import smile from './../../../../../../public/assets/images/smile.svg';
import send from './../../../../../../public/assets/images/send.svg';

function MessageInput() {
  return (
    <div  className={`${_classes["message-input"]} relative`}><Input placeholder="Type a new message"/>
        <span className="absolute top-3 right-24"><Image 
				alt=""
					width={25}
					height={25}
					src={attachIcon}
                    
				/>
                </span>
                <span className="absolute top-3 right-14"><Image 
				alt=""
					width={25}
					height={25}
					src={smile}
                    
				/>
                </span>
                <span className="absolute top-3 right-4"><Image 
				alt=""
					width={25}
					height={25}
					src={send}
                    
				/>
                </span>
                </div>
  )
}

export default MessageInput