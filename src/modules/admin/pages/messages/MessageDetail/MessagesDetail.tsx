import Image from "next/image";
import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import ChatBar from "../ChatBar/ChatBar";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageInput from "../MessageInput/MessageInput";
import ProfileBar from "../ProfileBar/ProfileBar";
import UserProfile from "../UserProfile/UserProfile";
import _classes from "./Message-detail.module.scss";


function Messages() {
	return (
		<AppLayout>
			<div className="w-full">
				<h2 className="mb-4">Messages</h2>
				
				<div className="w-full flex border border-gray-4">
					<div className="min-w-1/4 ">
						<ProfileBar />
					</div>
					<div className="w-3/4 border border-gray-4 ">

						<ChatHeader/>
                        <div className={`${_classes["custom-height"]}`}>
                        <div className="bg-gray-4 h-0.5 mt-6 relative mx-4">
                            <span className="bg-white absolute -top-50 left-1/2 -bottom-3">March 1,2022</span>
                        </div>
                        <ChatBar className="justify-start" bgColor="bg-gray-4" />
                        <ChatBar className="justify-end " bgColor="bg-gray-9" />
                        <div className="bg-gray-4 h-0.5 mt-6 relative mx-4">
                            <span className="bg-white absolute -top-50 left-1/2 -bottom-3">March 1,2022</span>
                        </div>
                        <ChatBar className="justify-start" bgColor="bg-gray-4" />
                        <ChatBar className="justify-end " bgColor="bg-gray-9" />
					</div>
					<MessageInput/>
                    </div>
					
				</div>
			
			</div>
		</AppLayout>
	);
}
export default Messages;
