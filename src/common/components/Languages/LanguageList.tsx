import React from "react";
import Language from "../Languague/Language";
import end from "../../../../public/assets/images/engFlag.png";
import esp from "../../../../public/assets/images/espanolFlag.png";
import { Form, FormInstance } from "antd";

type Props = {
  disable?: boolean;
  check?: boolean;
  formInstance?: FormInstance;
  language?: string;
};
const LanguageList = (props: Props) => {
  const { check, disable, formInstance, language } = props || {};
  let lanugae = formInstance?.getFieldsValue();
  console.log("language", language);
  return (
    <>
      <div className="mr-auto font-medium text-lightBold-1 my-2">Languages</div>
      <div className="flex mr-auto">
        <Form.Item label="Language" name="language" className="flex mr-auto">
          <Language
            end={end}
            title="English"
            check={language === "English"}
            disable={!disable}
          />
          </Form.Item>
          <Form.Item label="Language" name="language" className="flex mr-auto">
          <Language
            end={esp}
            title="Spanish"
            check={language === "Spanish"}
            disable={!disable}
            />
        
            </Form.Item>
      </div>
    </>
  );
};

export default LanguageList;
