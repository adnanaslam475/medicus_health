import { Form, Radio } from "antd";
import React, { useEffect, useState } from "react";
import Payment from "../Payment/Payment";
import visa from "./../../../../../../public/assets/images/visa.svg";
import mastercard from "./../../../../../../public/assets/images/mastercard.svg";
import defaultCard from "./../../../../../../public/assets/images/defaultCardImg.png";
import americanexpress from "./../../../../../../public/assets/images/americanexpress.svg";
import _Classes from "./MakePayment.module.scss";
import { useGetAllCardsQuery } from "../../../../../generated/graphql";
import { getUserData } from "../../../../../common/utils/userData";
import { useAppointmentModal } from "../AppointmentModalProvider";
import { OperationContext } from "urql";

const CARD_TYPE = {
  ["visa" as string]: visa,
  ["mastercard" as string]: mastercard,
  ["american express" as string]: americanexpress,
};

type Props = {
  setSelectedCardId?: React.Dispatch<React.SetStateAction<undefined | number>>;
  appointmentId?: number;
};
function MakePayment(props: Props) {
  const { setSelectedCardId, appointmentId } = props || {};
  // GET ALL CARDS API CALL
  const { saveStepTwo } = useAppointmentModal();
  const [value, setValue] = useState(0);
  const [{ data: allCardsData }] = useGetAllCardsQuery({
    variables: { userId: getUserData()?.user?.id as number },
  });

  useEffect(() => {
    setValue(allCardsData?.getAllCards[0]?.id as number);
    saveStepTwo?.({
      cardId: allCardsData?.getAllCards[0]?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCardsData?.getAllCards]);

  useEffect(() => {
    setSelectedCardId?.(value);
  }, [value]);
  return (
    <>
      <h2>Make payment</h2>
      <Form layout="vertical" className={`${_Classes["payment-form"]}`}>
        <div className="mt-8">
          <Radio.Group
            value={value}
            className="w-full"
            onChange={(e) => {
              setValue(e.target.value);
              saveStepTwo?.({
                cardId: e.target.value,
              });
            }}
          >
            {allCardsData?.getAllCards.map((card) => (
              <Payment
                cardId={card.id}
                visa={CARD_TYPE[card?.card_type.toLowerCase()] || defaultCard}
                title={`${card?.card_type} ending with ${card?.card_digits}`}
                description={`Expires on: ${card?.exp_month}/${card?.exp_year}`}
              />
            ))}
          </Radio.Group>
        </div>
      </Form>
    </>
  );
}

export default MakePayment;
