import { Box, Button, Checkbox, Typography } from "@mui/material";
import React from "react";
import useCheckout from "./hooks/useCheckout.jsx";
import IVAForm from "./common/IVAForm.jsx";
import PaymentOption from "./common/PaymentOptions.jsx";
import PaymentForm from "./common/PaymentForm.jsx";
import SideBar from "./common/SideBar.jsx";
import Content from "./common/Content.jsx";
import useSteps from "./hooks/useSteps.jsx";

import { useFormik } from "formik";

const ExistingUser = () => {
  const {
    data: { user, product },
    isError,
    isLoading,
  } = useCheckout({ session: 1 });

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
        enableCounter={step === 0}
      />
      <Content showPDF={showPDF}>
        <>
          {step == 0 && (
            <PaymentOption
              showTerms={true}
              setPaymentType={(v, _) => {
                setPaymentType(v);
                setIva(_);
                goTo(_ ? 1 : 2);
              }}
              paymentType={paymentType}
            />
          )}
          {step == 1 && <IVAForm next={() => goTo(2)} />}
          {step == 2 && <PaymentForm iva={iva} paymentType={paymentType} />}
        </>
      </Content>
    </>
  );
};

export default ExistingUser;
