import React from "react";
import Language from "../Languague/Language";
import end from "../../../../public/assets/images/engFlag.png";
import esp from "../../../../public/assets/images/espanolFlag.png";

const LanguageList = () => {
  return (
    <>
      <div className="mr-auto font-medium text-lightBold-1 my-2">Languages</div>
      <div className="flex mr-auto">
        <Language end={end} title="English" check={true} disable={true} />
        <Language end={esp} title="Spanish" check={false} disable={true} />
      </div>
    </>
  );
};

export default LanguageList;
