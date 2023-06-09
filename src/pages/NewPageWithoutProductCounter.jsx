import React from "react";
import useCheckout from "./hooks/useCheckout.jsx";
import IVAForm from "./common/IVAForm.jsx";
import PaymentOption from "./common/PaymentOptions.jsx";
import PaymentForm from "./common/PaymentForm.jsx";
import SideBar from "./common/SideBar.jsx";
import Content from "./common/Content.jsx";
import useSteps from "./hooks/useSteps.jsx";

const NewPageWithoutProductCounter = () => {
  const { data } = useCheckout({ session: 1 });

  const user = data?.user;
  const product = data?.product;

  const { step, goBack, goTo } = useSteps();

  const [paymentType, setPaymentType] = React.useState("Stripe");

  const [iva, setIva] = React.useState(false);

  const [showPDF, setShowPDF] = React.useState(false);

  return (
    <>
      <SideBar
        enableViewProduct={true}
        setShowPDF={setShowPDF}
        showPdf={showPDF}
        enableDiscount={step === 0}
        showCounter={false}
      />
      <Content showPDF={showPDF}>
        <>
          {step == 0 && (
            <PaymentOption
              setPaymentType={(v, _) => {
                setPaymentType(v);
                setIva(_);
                goTo(_ ? 1 : 3);
              }}
              showTerms={true}
              paymentType={paymentType}
              product={product}
            />
          )}

          {step == 1 && (
            <IVAForm
              next={(v) => {
                goTo(3);
              }}
            />
          )}

          {step == 3 && (
            <PaymentForm
              iva={iva}
              product={product}
              user={user}
              paymentType={paymentType}
            />
          )}
        </>
      </Content>
    </>
  );
};

export default NewPageWithoutProductCounter;
