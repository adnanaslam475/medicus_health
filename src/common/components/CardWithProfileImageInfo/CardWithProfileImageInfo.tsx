import React from "react";
import ProfileImageWithInfo from "common/components/ProfleImageWithInfo/ProfileImageWithInfo";
import MessageButtons from "../MessageButtons/MessageButtons";

type Props = {
  children: React.ReactNode | JSX.Element | undefined;
  serviceName: string | undefined;
  name: string | undefined;
  imageUrl?: string | undefined | null;
};

function CardWithProfileImageInfo({
  children,
  serviceName,
  name,
  imageUrl,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-start">
        <ProfileImageWithInfo
          serviceName={serviceName || ""}
          name={name}
          imageUrl={imageUrl}
        />
        {/* <div className="messageButtons">
          <MessageButtons />
        </div> */}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default CardWithProfileImageInfo;
