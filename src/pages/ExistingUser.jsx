import React, { useEffect, useState } from "react";
import IVAForm from "./common/IVAForm.jsx";
import PaymentOption from "./common/PaymentOptions.jsx";
import PaymentForm from "./common/PaymentForm.jsx";
import SideBar from "./common/SideBar.jsx";
import Content from "./common/Content.jsx";
import useSteps from "./hooks/useSteps.jsx";
import useCheckout from "./hooks/useCheckout.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const ExistingUser = () => {
  const { step, goBack, goTo } = useSteps();
  const [paymentType, setPaymentType] = React.useState("Stripe");
  const [iva, setIva] = React.useState(false);
  const [showPDF, setShowPDF] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useCheckout({ session: 1 });

  const product = data?.product;

  const [user, setUser] = useState({});

  useEffect(() => {
    if (data?.user) {
      setUser(data?.user);

      if (!data?.user?.paid_initial) {
        navigate(location.pathname.replace("existing-user", "new-subscriber"));
      }
    }
  }, [data]);

  return (
    <>
      <SideBar
        enableViewProduct={true}
        setShowPDF={setShowPDF}
        showPdf={showPDF}
        enableDiscount={step === 0}
        enableCounter={step === 0}
        onProductQuantityChange={(quantity) => {
          setUser((prev) => {
            return {
              ...prev,
              quantity: quantity,
            };
          });
        }}
      />
      <Content showPDF={showPDF}>
        <>
          {step == 0 && (
            <PaymentOption
              showTerms={true}
              setPaymentType={(v, haveIva) => {
                setPaymentType(v);
                setIva(haveIva);
                goTo(haveIva ? 1 : 2);
              }}
              paymentType={paymentType}
              product={product}
            />
          )}
          {step == 1 && (
            <IVAForm
              next={(values) => {
                setUser((prev) => {
                  return {
                    ...prev,
                    vat: values,
                  };
                });
                goTo(2);
              }}
            />
          )}
          {step == 2 && <PaymentForm iva={iva} product={product} user={user} paymentType={paymentType} />}
        </>
      </Content>
    </>
  );
};

export default ExistingUser;
