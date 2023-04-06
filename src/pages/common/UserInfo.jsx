import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";
import { TextField } from "@components/textfield";
import InputAdornment from "@mui/material/InputAdornment";
import NearMeIcon from "@mui/icons-material/NearMe";
import Snackbar from "@mui/material/Snackbar";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";
import MuiAlert from "@mui/material/Alert";

import * as _ from "lodash";
const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserInfo = ({ product, next }) => {
  const [checked, setChecked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [autoComplete, setAutoComplete] = useState({ status: false });

  const formik = useFormik({
    initialValues: {
      nome: "",
      cognome: "",
      email: "",
      indirizzo: "",
      accettoTerms: false,
    },

    isInitialValid: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      nome: Yup.string().required("Required"),
      cognome: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),

      indirizzo: Yup.string().required("Required"),

      accettoTerms: Yup.boolean()
        .oneOf([true], "You must accept Terms and Conditions")
        .required("Required"),
    }),
  });
  const handleAddressChange = (value) => {
    if (value !== "") {
      const u = () => autoCompleteAddressHandler(value);
      _.delay(u, 1000);
    }
  };

  const geoLocate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const url = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=100000`;
        console.log("url", url);
        axios
          .get(url)
          .then((response) => {
            setAutoComplete({
              status: true,
              response: response.data.results,
            });
            const l = response?.data?.results?.map(
              (r) =>
                `${r?.address.freeformAddress.split(",")[0]}${
                  r?.address?.municipality
                    ? " , " + r?.address?.municipality
                    : ""
                }${
                  r?.address?.postalCode ? " , " + r?.address?.postalCode : ""
                }`
            );
            if (l.length > 0) {
              formik.setFieldValue("indirizzo", l[0]);
            } else {
              setOpenSnackbar(true);
            }
          })
          .catch((er) => setOpenSnackbar(true));
      });
    } else {
      console.log("Not Available");
    }
  };
  const autoCompleteAddressHandler = (value) => {
    axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${value}.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=41.9102415&lon=12.395915&radius=100000000`
      )
      .then((response) => {
        setAutoComplete({
          status: true,
          response: response.data.results,
        });
      })
      .catch((er) => formik.setFieldValue("indirizzo", value));
  };

  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Finalizza la tua iscrizione
      </h1>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="primary"
          sx={{ width: "100%" }}
        >
          No Address Found
        </Alert>
      </Snackbar>

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
          className="flex flex-col gap-8 overflow-x-hidden"
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
          <Autocomplete
            freeSolo
            onChange={(e, v) => {
              formik.setFieldValue("indirizzo", v);
            }}
            value={formik.values.indirizzo}
            error={formik.errors.indirizzo}
            helperText={formik.errors.indirizzo}
            options={
              autoComplete.response?.map(
                (r) =>
                  `${r?.address.freeformAddress.split(",")[0]}${
                    r?.address?.municipality
                      ? " , " + r?.address?.municipality
                      : ""
                  }${
                    r?.address?.postalCode ? " , " + r?.address?.postalCode : ""
                  }`
              ) ?? []
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Inserisci indirizzo"
                name="indirizzo"
                onChange={(e) => handleAddressChange(e.target?.value)}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  endAdornment: (
                    <InputAdornment position="end">
                      <button
                        type="button"
                        className="active:invert"
                        onClick={() => geoLocate()}
                      >
                        <NearMeIcon
                          sx={{
                            color: "#886FCC",
                            fontSize: "2rem",
                            marginRight: "1rem",
                          }}
                        />
                      </button>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {/* <TextField
            placeholder="Citta"
            name="citta"
            onChange={formik.handleChange}
            value={formik.values.citta}
            helperText={formik.errors.citta}
            error={formik.errors.citta}
          />
 */}

          {/* <TextField
            placeholder="CAP"
            name="cap"
            onChange={formik.handleChange}
            value={formik.values.cap}
            error={formik.errors.cap}
            helperText={formik.errors.cap}
          /> */}
        </Box>

        <div className="mt-4">
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
        </div>
        <Button
          type="button"
          color="buttonGreen"
          variant="contained"
          sx={{
            height: "59px",
            width: "100%",
            // mt: 0,
          }}
          // className="mt-8"
          disabled={!formik.values.accettoTerms}
          onClick={() => {
            formik.validateForm().then((r) => {
              if (Object.keys(r).length === 0) {
                next && next(checked);
              }
            });
          }}
        >
          Procedi
        </Button>
      </Box>
    </>
  );
};
export default UserInfo;
