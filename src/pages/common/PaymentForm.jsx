import React from "react";

import StripeCheckout from "./StripeCheckout.jsx";
import KlarnaCheckout from "./KlarnaCheckout.jsx";

const PaymentForm = ({ iva, paymentType, user, product }) => {
  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Effettua il pagamento
      </h1>
      {paymentType === "Stripe" ? (
        <StripeCheckout
          product={product}
          userToken={user?.token}
          userInfo={user}
          iva={iva}
        />
      ) : (
        <KlarnaCheckout
          product={product}
          user={user?.token}
          userInfo={user}
          iva={iva}
        />
      )}
    </>
  );
};
export default PaymentForm;
