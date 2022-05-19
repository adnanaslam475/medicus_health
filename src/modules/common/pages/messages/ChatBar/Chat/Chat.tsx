import React from "react";
import profile from "./../../../../../../../public/assets/images/your_photo.png";
import Image from "next/image";

type Props = {
  className: string;
  bgColor: string;
};
function Chat(props: Props) {
  const { className, bgColor } = props;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-1/2">
        <div className="flex items-start gap-2">
          <div className="w-1/12">
            <Image alt="" width={39} height={39} src={profile} />
          </div>
          <div className="gap-3 w-11/12">
            <div>
              <span className="text-base text-black pr-3">Paul Walner</span>
              <span className="text-base text-gray">3:30 AM</span>
            </div>
            <div className={`flex items-center gap-2 ${className}`}>
              <p
                className={`p-3 text-secondary rounded inline-block ${bgColor}`}
              >
                Fusce iaculis, massa ut elementum pharetra, lectus nulla rutrum
                metus, sed mollis dui ex at velit. Integer non vehicula nunc, ut
                ullamcorper ligula. Ut fermentum tincidunt orci, id dapibus ex
                fringilla nec.
              </p>
            </div>
            <div className={`flex items-center gap-2 ${className}`}>
              <p
                className={`p-3 text-secondary rounded inline-block ${bgColor}`}
              >
                Fusce iaculis,
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
