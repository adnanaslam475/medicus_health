import { Form } from "antd";
import React from "react";
import Payment from "../Payment/Payment";
import visa from "./../../../../../../public/assets/images/visa.svg";
import mastercard from "./../../../../../../public/assets/images/mastercard.svg";
import _Classes from "./MakePayment.module.scss";
import { useGetAllCardsQuery } from "../../../../../generated/graphql";
import { getUserData } from "../../../../../common/utils/userData";

const CARD_TYPE = {
  ["visa" as string]: visa,
  ["MasterCard" as string]: mastercard,
};

function MakePayment() {
  // GET ALL CARDS API CALL
  const [{ data: allCardsData }] = useGetAllCardsQuery({
    variables: { userId: getUserData()?.user?.id as number },
  });

  return (
    <>
      <h2>Make Payment</h2>
      <Form layout="vertical">
        <div className="mt-8">
          {allCardsData?.getAllCards.map((card) => (
            <Payment
              visa={CARD_TYPE[card?.card_type]}
              title={`${card?.card_type} Ending with ${card?.card_digits}`}
              description={`Expires at: ${card?.exp_month}/${card?.exp_year}`}
            />
          ))}
        </div>
      </Form>
    </>
  );
}

export default MakePayment;
