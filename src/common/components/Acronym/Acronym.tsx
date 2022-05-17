import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import _classes from "./Acronym.module.scss";

type Props = {
  character: string;
  word: string;
};
function Acronym(props: Props) {
  const { character, word } = props;
  return (
    <div className="py-2">
      <div className="flex w-full gap-2">
        <span className="text-base font-bold rounded text-primary  h-full px-2 bg-lightBlue">
          {character}
        </span>
        <div className={`{${_classes["acronym"]} w-full`}>
          <span className="text-lg font-medium text-lightBlue-1">{word}</span>
          <Form.Item name={word.toLocaleLowerCase()}>
            <TextArea />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default Acronym;
