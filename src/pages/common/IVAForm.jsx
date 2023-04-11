import { Box, Button, Checkbox, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";
import { TextField } from "@components/textfield";
import Autocomplete from "@mui/material/Autocomplete";
import NearMeIcon from "@mui/icons-material/NearMe";
import * as _ from "lodash";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const IVAForm = (props) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [autoComplete, setAutoComplete] = React.useState({ status: false });
  const formik = useFormik({
    initialValues: {
      denominazioneERagioneSociale: "",
      partitaIVA: "",
      codicDestinatario: "",
      indirizzo: "",
      PECDesitinatatio: "",
    },
    isInitialValid: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      denominazioneERagioneSociale: Yup.string().required("Required"),
      partitaIVA: Yup.string().required("Required"),
      codicDestinatario: Yup.string().required("Required"),
      indirizzo: Yup.string().required("Required"),
      PECDesitinatatio: Yup.string().required("Required"),
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
        const url = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=1000`;
        console.log("url", url);
        setAddressLoading(true);
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
        setAddressLoading(false);
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
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl  h-fit  w-full">
        Fornisci le informazioni della Partita IVA
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
            placeholder="PEC Destinatatio"
            name="PECDesitinatatio"
            value={formik.values.PECDesitinatatio}
            onChange={formik.handleChange}
            error={formik.errors.PECDesitinatatio}
            helper={formik.errors.PECDesitinatatio}
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
              ) ?? ["Rome"]
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
                      {addressLoading ? (
                        <CircularProgress />
                      ) : (
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
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Button
          color="green"
          sx={{
            height: "59px",
            width: "100%",
            mt: 0,
          }}
          variant="contained"
          className="mt-8"
          onClick={() => {
            formik.validateForm().then((r) => {
              if (Object.keys(r).length === 0) {
                console.log("herere");
                props?.next && props?.next();
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

export default IVAForm;
