import React from "react";

import StripeCheckout from "./StripeCheckout.jsx";
import KlarnaCheckout from "./KlarnaCheckout.jsx";
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PaymentForm = ({ iva, paymentType, user, product }) => {
  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Effettua il pagamento
      </h1>
      {paymentType === "Stripe" ? (
        <StripeCheckout product={product} userToken={user?.token} iva={iva} />
      ) : (
        <KlarnaCheckout product={product} user={user?.token} iva={iva} />
      )}
    </>
  );
};
export default PaymentForm;
