import React from "react";
import MakePaymentMorePage from "./MakePaymentMorePage";

type Props = {
  onPrevious?: () => void;
  setSelectedCardId?: React.Dispatch<React.SetStateAction<undefined | number>>;
};
function index(props: Props) {
  const { setSelectedCardId, onPrevious } = props || {};

  return (
    <MakePaymentMorePage
      setSelectedCardId={setSelectedCardId}
      onPrevious={onPrevious}
    />
  );
}

export default index;
