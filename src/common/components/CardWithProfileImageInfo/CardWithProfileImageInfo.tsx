import ProfileImageWithInfo from "common/components/ProfleImageWithInfo/ProfileImageWithInfo";
import React from "react";

type Props = {
  children: React.ReactNode | JSX.Element | undefined;
  serviceName: string | undefined;
  name: string | undefined;
};

function CardWithProfileImageInfo({ children, serviceName, name }: Props) {
  return (
    <div>
      <ProfileImageWithInfo
        serviceName={serviceName || ""}
        name={name}
        imageUrl=""
      />
      <div>{children}</div>
    </div>
  );
}

export default CardWithProfileImageInfo;
