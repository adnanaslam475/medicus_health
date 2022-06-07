import React from "react";
import Language from "../Languague/Language";
import end from "../../../../public/assets/images/engFlag.png";
import esp from "../../../../public/assets/images/espanolFlag.png";
import { Form, FormInstance } from "antd";

type LanguageType = {
  Spanish?: boolean;
  English?: boolean;
};

type Props = {
  disable?: boolean;
  check?: boolean;
  formInstance?: FormInstance;
  language?: LanguageType;
};
const LanguageList = (props: Props) => {
  const { check, disable, formInstance, language } = props || {};
  return (
    <>
      <div className="mr-auto font-medium text-lightBold-1 my-2">Languages</div>
      {language?.English !== undefined && <div className="flex mr-auto">
        <Form.Item label="" name="english" className="flex mr-auto">
          <Language
            end={end}
            title="English"
            check={language?.English}
            disable={disable}
          />
        </Form.Item>
        <Form.Item label="" name="spanish" className="flex mr-auto">
          <Language
            end={esp}
            title="Spanish"
            check={language?.Spanish}
            disable={disable}
          />
        </Form.Item>
      </div>}
    </>
  );
};

export default LanguageList;
