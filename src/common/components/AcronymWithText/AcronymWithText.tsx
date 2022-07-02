import React from "react";
import _classes from "./AcronymWithText.module.scss";

type Props = {
  character: string;
  sentence: string | null;
  word: string;
};
function AcronymWithText(props: Props) {
  const { character, word, sentence } = props;
  return (
    <div className="py-3 border-b-2 border-gray-4">
      <div className="flex w-full gap-2">
        <span className="text-2xl font-medium rounded text-primary h-full px-3 py-1 bg-lightBlue character">
          {character}
        </span>
        <div className={`{${_classes["acronym"]} w-full`}>
          <span className="text-lg font-medium text-lightBlue-1">{word}</span>
          <p className="pb-0 mb-0">{sentence}</p>
        </div>
      </div>
    </div>
  );
}

export default AcronymWithText;
