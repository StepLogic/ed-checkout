import { TextField } from "@components/textfield";
import AddressField from "@components/AddressField";
import { Box, Button } from "@mui/material";

import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const IVAForm = (props) => {
  const formik = useFormik({
    initialValues: {
      denominazioneERagioneSociale: "",
      partitaIVA: "",
      codicDestinatario: "",
      indirizzo: "",
      PECDesitinatatio: "",
    },
    isInitialValid: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      denominazioneERagioneSociale: Yup.string().required("Campo richiesto"),
      partitaIVA: Yup.string().required("Campo richiesto"),
      codicDestinatario: Yup.string().required("Campo richiesto"),
      indirizzo: Yup.string().required("Campo richiesto").nullable(),
      PECDesitinatatio: Yup.string().required("Campo richiesto"),
    }),
  });

  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl  h-fit  w-full">
        Fornisci le informazioni della Partita IVA
      </h1>

      <Box
        sx={{
          display: ["grid"],
          gridTemplateColumns: "1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="mt-4 lg:mt-0"
      >
        <Box
          component="form"
          sx={{
            height: "100%",
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
              height: "0!important",
            },
          }}
          className="flex flex-col gap-8"
        >
          <TextField
            placeholder="Denominazione e Ragione Sociale"
            name="denominazioneERagioneSociale"
            value={formik.values.denominazioneERagioneSociale}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.denominazioneERagioneSociale &&
              formik.errors.denominazioneERagioneSociale
            }
            helperText={
              formik.touched.denominazioneERagioneSociale &&
              formik.errors.denominazioneERagioneSociale
            }
          />
          <TextField
            placeholder="Partita IVA"
            name="partitaIVA"
            value={formik.values.partitaIVA}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.partitaIVA && formik.errors.partitaIVA}
            helperText={formik.touched.partitaIVA && formik.errors.partitaIVA}
          />
          <TextField
            placeholder="Codice Destinatario"
            value={formik.values.codicDestinatario}
            name="codicDestinatario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.codicDestinatario &&
              formik.errors.codicDestinatario
            }
            helperText={
              formik.touched.codicDestinatario &&
              formik.errors.codicDestinatario
            }
          />

          <AddressField
            handleChange={formik.setFieldValue}
            name="indirizzo"
            handleBlur={formik.handleBlur}
            value={formik.values.indirizzo}
            error={formik.touched.indirizzo && formik.errors.indirizzo}
          />
          <TextField
            placeholder="PEC destinatario"
            name="PECDesitinatatio"
            value={formik.values.PECDesitinatatio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.PECDesitinatatio && formik.errors.PECDesitinatatio
            }
            helperText={
              formik.touched.PECDesitinatatio && formik.errors.PECDesitinatatio
            }
          />
        </Box>
      </Box>

      <Button
        type="button"
        color="buttonGreen"
        size="large"
        variant="contained"
        sx={{
          height: "59px",
          width: "100%",
        }}
        disabled={Object.values(formik.errors).length !== 0}
        className="mt-auto"
        onClick={() => {
          props?.next && props?.next();
        }}
      >
        Procedi
      </Button>
    </>
  );
};

export default IVAForm;
