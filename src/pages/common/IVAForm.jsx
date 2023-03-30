import { Box, Button, Checkbox, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";
import { TextField } from "@components/textfield";
const IVAForm = (props) => {
  const formik = useFormik({
    initialValues: {
      denominazioneERagioneSociale: "",
      partitaIVA: "",
      codicDestinatario: "",
      cittaECap: "",
      PECDesitinatatio: "",
      CAP: "",
    },
    isInitialValid: false,
    validationSchema: Yup.object({
      denominazioneERagioneSociale: Yup.string().required("Required"),
      partitaIVA: Yup.string().required("Required"),
      codicDestinatario: Yup.string().required("Required"),
      cittaECap: Yup.string().required("Required"),
      PECDesitinatatio: Yup.string().required("Required"),
      CAP: Yup.string().required("Required"),
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
        className=" "
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
          }}
          className="flex flex-col gap-8"
        >
          <TextField
            placeholder="Denominazione e Ragione Sociale"
            name="denominazioneERagioneSociale"
            value={formik.values.denominazioneERagioneSociale}
            onChange={formik.handleChange}
            error={formik.errors.denominazioneERagioneSociale}
            helper={formik.errors.denominazioneERagioneSociale}
          />
          <TextField
            placeholder="Partita IVA"
            name="partitaIVA"
            value={formik.values.partitaIVA}
            onChange={formik.handleChange}
            error={formik.errors.partitaIVA}
            helper={formik.errors.partitaIVA}
          />
          <TextField
            placeholder="Codice Destinatario"
            value={formik.values.codicDestinatario}
            name="codicDestinatario"
            onChange={formik.handleChange}
            error={formik.errors.codicDestinatario}
            helper={formik.errors.codicDestinatario}
          />
          <TextField
            placeholder="Città, indirizzo e CAP"
            name="cittaECap"
            value={formik.values.cittaECap}
            onChange={formik.handleChange}
            error={formik.errors.cittaECap}
            helper={formik.errors.cittaECap}
          />
          <TextField
            placeholder="PEC Destinatatio"
            name="PECDesitinatatio"
            value={formik.values.PECDesitinatatio}
            onChange={formik.handleChange}
            error={formik.errors.PECDesitinatatio}
            helper={formik.errors.PECDesitinatatio}
          />
          <TextField
            placeholder="CAP"
            name="CAP"
            value={formik.values.CAP}
            onChange={formik.handleChange}
            error={formik.errors.CAP}
            helper={formik.errors.CAP}
          />
        </Box>

        <Button
          color="green"
          sx={{
            height: "59px",
          }}
          variant="contained"
          className="mt-8"
          disabled={!formik.isValid}
          onClick={() => {
            props?.next && props?.next();
          }}
        >
          Procedi
        </Button>
      </Box>
    </>
  );
};

export default IVAForm;
