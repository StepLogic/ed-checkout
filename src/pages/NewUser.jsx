import React from "react";
import useCheckout from "./hooks/useCheckout.jsx";
import IVAForm from "./common/IVAForm.jsx";
import UserInfo from "./common/UserInfo.jsx";
import PaymentForm from "./common/PaymentForm.jsx";
import SideBar from "./common/SideBar.jsx";
import Content from "./common/Content.jsx";
import useSteps from "./hooks/useSteps.jsx";
import PaymentOption from "./common/PaymentOptions.jsx";

const NewSubscriber = () => {
  const {
    data: { user, product },
    isError,
    isLoading,
  } = useCheckout({ session: 1 });

  const { step, goBack, goTo } = useSteps();
  const [paymentType, setPaymentType] = React.useState("Stripe");
  const [iva, setIva] = React.useState(false);
  const [showPDF, setShowPDF] = React.useState(false);
  const [productQuantity, setProductQuantity] = React.useState(1);

  return (
    <>
      <SideBar
        enableViewProduct={true}
        setShowPDF={setShowPDF}
        enableDiscount={step === 0}
        enableCounter={step === 0}
      />
      <Content showPDF={showPDF}>
        <>
          <>
            {step == 0 && (
              <UserInfo
                product={product}
                next={(v) => {
                  goTo(v ? 1 : 2);
                  setIva(v);
                }}
              />
            )}
            {step == 1 && <IVAForm next={() => goTo(3)} />}
            {step == 2 && (
              <PaymentOption
                setPaymentType={(v, _) => {
                  setPaymentType(v);
                  goTo(3);
                }}
                paymentType={paymentType}
              />
            )}
            {step == 3 && (
              <PaymentForm
                iva={iva}
                product={product}
                user={user}
                paymentType={"Stripe"}
              />
            )}
          </>
        </>
      </Content>
    </>
  );
};

export default NewSubscriber;