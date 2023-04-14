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
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const IVAForm = (props) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [addressLoading, setAddressLoading] = React.useState(false);
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
    setAddressLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const url = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=1000`;
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
    setAddressLoading(false);
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

          <Autocomplete
            freeSolo
            value={formik.values.indirizzo}
            error={formik.errors.indirizzo}
            onChange={(e, v) => {
              formik.setFieldValue("indirizzo", v);
            }}
            onInputChange={(e) => {
              if (e != null) {
                formik.setFieldValue("indirizzo", e.target.value);
                handleAddressChange(e.target?.value);
              }
            }}
            helperText={formik.errors.indirizzo}
            classes={{ clearIndicator: "!text-[#8065C9] h" }}
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
                placeholder="Città, indirizzo e CAP"
                name="indirizzo"
                className="overflow-hidden"
                InputProps={{
                  ...params.InputProps,

                  endAdornment: (
                    <InputAdornment position="end">
                      <div className="flex flex-row items-center relative">
                        <Box
                          sx={{
                            "&>div": {
                              top: "0!important",
                              width: "2rem",
                              height: "2rem",
                            },
                            "&>div>button": {
                              top: "0!important",
                              width: "2rem",
                              height: "2rem",
                              fontSize: "2rem",
                              padding: "0",
                              marginBottom: "1rem",
                            },
                            "&>div>button>svg": {
                              fontSize: "2rem",
                            },
                          }}
                          className="my-auto left-[2rem] absolute h-[2rem] w-[2rem] top-0 bottom-0"
                        >
                          {params.InputProps.endAdornment}
                        </Box>

                        {addressLoading ? (
                          <CircularProgress className="w-[1.5rem] h-[1.5rem]" />
                        ) : (
                          <button
                            type="button"
                            className="active:text-[#B4B4B4] active:border-[#B4B4B4]"
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
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <TextField
            placeholder="PEC Destinatatio"
            name="PECDesitinatatio"
            value={formik.values.PECDesitinatatio}
            onChange={formik.handleChange}
            error={formik.errors.PECDesitinatatio}
            helper={formik.errors.PECDesitinatatio}
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
        className="mt-auto"
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
    </>
  );
};

export default IVAForm;
