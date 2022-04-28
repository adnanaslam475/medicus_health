import { Form, Radio } from "antd";
import React from "react";
import Payment from "../Payment/Payment";
import visa from "./../../../../../../public/assets/images/visa.svg";
import mastercard from "./../../../../../../public/assets/images/mastercard.svg";
import defaultCard from "./../../../../../../public/assets/images/defaultCardImg.png";
import _Classes from "./MakePayment.module.scss";
import { useGetAllCardsQuery } from "../../../../../generated/graphql";
import { getUserData } from "../../../../../common/utils/userData";
import { useAppointmentModal } from "../AppointmentModalProvider";

const CARD_TYPE = {
  ["visa" as string]: visa,
  ["MasterCard" as string]: mastercard,
};

function MakePayment() {
  // GET ALL CARDS API CALL
  const { saveStepTwo } = useAppointmentModal();
  const [{ data: allCardsData }] = useGetAllCardsQuery({
    variables: { userId: getUserData()?.user?.id as number },
  });

  return (
    <>
      <h2>Make Payment</h2>
      <Form layout="vertical">
        <div className="mt-8">
          <Radio.Group
            defaultValue={allCardsData?.getAllCards[0].id}
            onChange={(e) => {
              saveStepTwo?.({
                cardId: e.target.value,
              });
            }}
          >
            {allCardsData?.getAllCards.map((card) => (
              <Payment
                cardId={card.id}
                visa={CARD_TYPE[card?.card_type] || defaultCard}
                title={`${card?.card_type} Ending with ${card?.card_digits}`}
                description={`Expires at: ${card?.exp_month}/${card?.exp_year}`}
              />
            ))}
          </Radio.Group>
        </div>
      </Form>
    </>
  );
}

export default MakePayment;
