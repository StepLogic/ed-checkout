import React, { useEffect, useState } from "react";
import useCheckout from "./hooks/useCheckout.jsx";
import IVAForm from "./common/IVAForm.jsx";
import UserInfo from "./common/UserInfo.jsx";
import PaymentForm from "./common/PaymentForm.jsx";
import SideBar from "./common/SideBar.jsx";
import Content from "./common/Content.jsx";
import useSteps from "./hooks/useSteps.jsx";

const NewSubscriber = () => {
  const { data } = useCheckout({ session: 1 });

  const product = data?.product;

  const { step, goBack, goTo } = useSteps();
  // const [paymentType, setPaymentType] = React.useState("Stripe");
  const [iva, setIva] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (data?.user) setUser(data?.user);
  }, [data]);

  console.log("user", user);

  return (
    <>
      <SideBar
        enableViewProduct={true}
        setShowPDF={setShowPDF}
        showPdf={showPDF}
        enableDiscount={false}
        enableCounter={false}
        isNewSubscriber={true}
        showCounter={false}
      />
      <Content showPDF={showPDF}>
        <>
          <>
            {step == 0 && (
              <UserInfo
                product={product}
                user={user}
                next={(v, values) => {
                  setUser((prev) => {
                    return {
                      ...prev,
                      name: values.nome,
                      lname: values.cognome,
                      email: values.email,
                      address: values.indirizzo,
                    };
                  });
                  goTo(v ? 1 : 2);
                  setIva(v);
                }}
              />
            )}
            {step == 1 && (
              <IVAForm
                next={(values) => {
                  setUser((prev) => {
                    return {
                      ...prev,
                      iva: values,
                    };
                  });
                  goTo(2);
                }}
              />
            )}
            {step == 2 && (
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
