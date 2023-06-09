import AddressField from "@components/AddressField";
import { TextField } from "@components/textfield";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Link,
} from "@mui/material";
import axios from "axios";
import cn from "classnames";
import { useFormik } from "formik";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import * as Yup from "yup";
import { capitalize } from "lodash";

String.prototype.strCapitalization = function () {
  if (this.includes("'"))
    return this.split("'")
      .map((w) => capitalize(w))
      .join("'");

  if (this.includes(" "))
    return this.split(" ")
      .map((w) => capitalize(w).trim())
      .join(" ");

  return capitalize(this);
};

const UserInfo = ({ product, user, next }) => {
  const [checked, setChecked] = useState(false);
  const [existingMail, setExistingMail] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      cognome: "",
      email: "",
      indirizzo: "",
      accettoTerms: false,
    },

    initialErrors: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      nome: Yup.string().required("Nome richiesto"),
      cognome: Yup.string().required("Cognome richiesto"),
      email: Yup.string()
        .required("Email richiesta")
        .email("Email non valida")
        .nullable(),
      indirizzo: Yup.string().required("Indirizzo richiesto").nullable(),
      accettoTerms: Yup.boolean()
        .oneOf([true], "You must accept Terms and Conditions")
        .required("Campo richiesto"),
    }),
  });

  const userMail = useDebounce(formik.values.email, 600);

  const checkEmail = (email) => {
    if (email) {
      setExistingMail(false);
      formik.setTouched({ email: false });
      axios
        .post(`${import.meta.env.VITE_BASE_URL}v1/check/email`, { email })
        .then((response) => {
          if (response?.data?.existing) {
            setExistingMail(true);
          } else {
            setExistingMail(false);
          }
          formik.setTouched({ email: true });
        })
        .catch((er) => {
          console.log("er", er);
        });
    }
  };

  useEffect(() => {
    if (user) {
      formik.setValues({
        nome: user?.name || user?.nome,
        cognome: user?.lname || user?.cognome,
        email: user.email,
        indirizzo: "",
        accettoTerms: false,
      });
    }
  }, [user]);

  useEffect(() => {
    // if userMail match @

    if (userMail && userMail.includes("@") && !formik.errors.email)
      checkEmail(userMail);

    // if (userMail && userMail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) checkEmail(userMail);
  }, [userMail]);

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[21px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Finalizza la tua iscrizione
      </h1>

      <Box
        component="form"
        sx={{
          height: "110%",

          ["@media (min-width:736px)"]: {
            maxHeight: "50vh",
            height: "100%",
            overflowY: "scroll",
          },

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
        className="flex flex-col gap-8"
      >
        <TextField
          placeholder="Nome"
          name="nome"
          onChange={(e) =>
            formik.setFieldValue(
              e.target.name,
              e.target.value?.strCapitalization()
            )
          }
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
          onChange={(e) =>
            formik.setFieldValue(
              e.target.name,
              e.target.value?.strCapitalization()
            )
          }
          value={formik.values.cognome}
          error={formik.errors.cognome && formik.touched.cognome}
          helperText={formik.touched.cognome && formik.errors.cognome}
        />
        <TextField
          placeholder="Email"
          name="email"
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">
                  {(formik.errors.email && formik.touched.email) ||
                  existingMail ? (
                    <ErrorOutlineIcon />
                  ) : !formik.errors.email && formik.touched.email ? (
                    <CheckCircleOutlineIcon />
                  ) : null}
                </InputAdornment>
              </>
            ),
          }}
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={
            existingMail
              ? "Email già esistente"
              : formik.touched.email && formik.errors.email
          }
          error={existingMail || (formik.errors.email && formik.touched.email)}
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
                " text-edu-900 formik.values.accettoTerms text-[14px] md:text-base"
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
          disabled={Object.values(formik.errors).length !== 0 || existingMail}
          onClick={() => {
            next && next(checked, formik.values);
          }}
        >
          Procedi
        </Button>
      </div>
    </>
  );
};
export default UserInfo;
