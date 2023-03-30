import {
  Box,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import klarna from "../../assets/img/klarna.svg";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PaymentOption = ({
  paymentType,
  setPaymentType,
  showTerms = false,
  product,
}) => {
  const [checked, setChecked] = useState(false);
  const [accettoTerms, setAccettoTerms] = useState(false);
  const [selection, setSelection] = useState(paymentType);
  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Scegli il metodo di pagamento
      </h1>
      <Box className="grid grid-cols-1">
        <RadioGroup
          className="grid grid-cols-1 gap-4  h-fit"
          sx={{ gridAutoRows: "min(95px,20vh)" }}
          aria-labelledby="demo-radio-buttons-group-label"
          onChange={(e) => setSelection(e.target.value)}
          value={selection}
          name="radio-buttons-group"
        >
          <div className="py-3 my-1 flex flex-row items-center rounded-lg bg-edu-light-blue">
            <FormControlLabel
              value="Stripe"
              control={<Radio className="md:ml-8 ml-6 md:mr-4" />}
              label={<span className=" text-edu-900">PAGA TUTTO SUBITO</span>}
            />
          </div>

          <div className="py-3 my-1  flex  flex-row  items-center rounded-lg bg-edu-light-blue">
            <FormControlLabel
              value="Klarna"
              control={<Radio className="md:ml-8 ml-6 md:mr-4" />}
              label={
                <div className="flex items-center text-edu-900">
                  PAGA IN 3 RATE CON{" "}
                  <img src={klarna} className="ml-2 w-[20%] lg:w-auto" />
                </div>
              }
            />
          </div>
        </RadioGroup>
      </Box>
      <Box className={"flex flex-col max-w-full justify-end flex-auto"}>
        {showTerms && (
          <>
            <FormControlLabel
              className="mb-[8px] lg:mb-[10px] ml-0 w-full "
              control={
                <Checkbox
                  id="checkbox"
                  checked={checked}
                  onClick={() => setChecked((prev) => !prev)}
                />
              }
              labelPlacement={"end"}
              label={
                <div className="text-edu-900 text-[14px] md:text-base">
                  Ho la P.IVA. / Paga il corso la mia azienda
                </div>
              }
            />
            <FormControlLabel
              className="mb-[8px] lg:mb-[10px] ml-0 w-full "
              control={
                <Checkbox
                  id="checkbox"
                  checked={accettoTerms}
                  onClick={() => setAccettoTerms((prev) => !prev)}
                />
              }
              labelPlacement={"end"}
              label={
                <div className="text-edu-900 text-[14px] md:text-base">
                  Ho letto e accetto i&nbsp;
                  <Link target={"_blank"} href={product?.links?.terms}>
                    Termini e le Condizioni
                  </Link>
                  &nbsp; del servizio e la&nbsp;
                  <Link target={"_blank"} href={product?.links?.policy}>
                    Privacy Policy
                  </Link>
                </div>
              }
            />
          </>
        )}
        <Button
          type="button"
          color="buttonGreen"
          variant="contained"
          sx={{ mt: 0, width: "100%" }}
          disabled={showTerms && !accettoTerms}
          size="large"
          onClick={() => setPaymentType(selection, checked)}
        >
          procedi
        </Button>
      </Box>
    </>
  );
};
export default PaymentOption;
