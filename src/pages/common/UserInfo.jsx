import AddressField from "@components/AddressField";
import { TextField } from "@components/textfield";
import { Box, Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import cn from "classnames";
import { useFormik } from "formik";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserInfo = ({ product, next }) => {
  const [checked, setChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      cognome: "",
      email: "",
      indirizzo: "",
      accettoTerms: false,
    },

    isInitialValid: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      nome: Yup.string().required("Nome richiesto"),
      cognome: Yup.string().required("Cognome richiesto"),
      email: Yup.string().email("Email non valido").required("Email richiesta"),
      indirizzo: Yup.string().required("Indirizzo richiesto").nullable(),
      accettoTerms: Yup.boolean()
        .oneOf([true], "You must accept Terms and Conditions")
        .required("Campo richiesto"),
    }),
  });

  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Finalizza la tua iscrizione
      </h1>

      <Box
        component="form"
        sx={{
          height: "100%",
          ["@media (min-width:736px)"]: {
            maxHeight: "50vh",
          },
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8065C9",
          },
          "scrollbar-width": "thin",
          "scrollbar-color": "#8065C9 green",
          ".MuiInputBase-root input": {
            fontSize: ["20px", "1.4rem"],
            color: "#2D224C",
          },
          ".MuiFormHelperText-root ": {
            height: "0px!important",
          },
        }}
        className="flex flex-col gap-8 overflow-x-hidden"
      >
        <TextField
          placeholder="Nome"
          name="nome"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          value={formik.values.nome}
          error={formik.errors.nome && formik.touched.nome}
          helperText={formik.touched.nome && formik.errors.nome}
        />
        <TextField
          placeholder="Cogome"
          name="cognome"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.cognome}
          error={formik.errors.cognome && formik.touched.cognome}
          helperText={formik.touched.cognome && formik.errors.cognome}
        />
        <TextField
          placeholder="Email"
          name="email"
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && formik.errors.email}
        />

        <AddressField
          handleChange={formik.setFieldValue}
          name="indirizzo"
          handleBlur={formik.handleBlur}
          value={formik.values.indirizzo}
          error={formik.touched.indirizzo && formik.errors.indirizzo}
        />
      </Box>

      <div className="mt-4  flex flex-col justify-end">
        <FormControlLabel
          className="mb-[8px] lg:mb-[0px] mx-0 w-full "
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
          className="mb-[8px] lg:mb-[0px] mx-0 w-full "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="accettoTerms"
          control={
            <Checkbox id="checkbox" checked={formik.values.accettoTerms} />
          }
          labelPlacement={"end"}
          label={
            <div
              className={cn(
                " text-edu-900 formik.values.accettoTerms text-[14px] md:text-base",
                {
                  ["!text-[#d32f2f]"]:
                    formik.touched.accettoTerms && formik.errors.accettoTerms,
                  ["!text-edu-900"]: !(
                    formik.touched.accettoTerms && formik.errors.accettoTerms
                  ),
                }
              )}
            >
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
        <Button
          type="button"
          color="buttonGreen"
          size="large"
          variant="contained"
          sx={{
            height: "59px",
            width: "100%",
          }}
          className="mt-8 lg:mt-0"
          disabled={Object.values(formik.errors).length !== 0}
          onClick={() => {
            next && next(checked);
          }}
        >
          Procedi
        </Button>
      </div>
    </>
  );
};
export default UserInfo;
