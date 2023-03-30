import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";
import { TextField } from "@components/textfield";
const UserInfo = ({ product, next }) => {
  const [checked, setChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      cognome: "",
      email: "",
      citta: "",
      indirizzo: "",
      cap: "",
      accettoTerms: false,
    },

    isInitialValid: false,
    validationSchema: Yup.object({
      nome: Yup.string().required("Required"),
      cognome: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      citta: Yup.string().required("Required"),
      indirizzo: Yup.string().required("Required"),
      cap: Yup.string().required("Required"),
      accettoTerms: Yup.boolean()
        .oneOf([true], "You must accept Terms and Conditions")
        .required("Required"),
    }),
  });

  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Finalizza la tua iscrizione
      </h1>
      <Box
        sx={{
          display: ["grid"],
          gridTemplateColumns: "1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="h-full "
      >
        <Box
          component="form"
          sx={{
            height: "100%",
            maxHeight: "35vh",
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
          }}
          className="flex flex-col gap-8"
        >
          <TextField
            placeholder="Nome"
            name="nome"
            onChange={formik.handleChange}
            type="text"
            value={formik.values.nome}
            error={formik.errors.nome}
            helperText={formik.errors.nome}
          />
          <TextField
            placeholder="Cogome"
            name="cognome"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cognome}
            error={formik.errors.cognome}
            helperText={formik.errors.cognome}
          />
          <TextField
            placeholder="Email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={formik.errors.email}
            error={formik.errors.email}
          />
          <TextField
            placeholder="Citta"
            name="citta"
            onChange={formik.handleChange}
            value={formik.values.citta}
            helperText={formik.errors.citta}
            error={formik.errors.citta}
          />
          <TextField
            placeholder="Indirizzo"
            name="indirizzo"
            onChange={formik.handleChange}
            value={formik.values.indirizzo}
            error={formik.errors.indirizzo}
            helperText={formik.errors.indirizzo}
          />
          <TextField
            placeholder="CAP"
            name="cap"
            onChange={formik.handleChange}
            value={formik.values.cap}
            error={formik.errors.cap}
            helperText={formik.errors.cap}
          />
        </Box>

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
            onChange={formik.handleChange}
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
                    ["!text-[#d32f2f]"]: formik.errors.accettoTerms,
                    ["!text-edu-900"]: !formik.errors.accettoTerms,
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
        </>
        <Button
          color="green"
          sx={{
            height: "59px",
          }}
          variant="contained"
          className="mt-8"
          disabled={!formik.isValid}
          onClick={() => {
            next && next(checked);
          }}
        >
          Procedi
        </Button>
      </Box>
    </>
  );
};
export default UserInfo;
