import TextField from "@components/textfield";
import {
  // Box,
  CircularProgress,
  FormControl,
  FormHelperText,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useEffect } from "react";

import * as Yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CaNearMe, CaWriting } from "./Icons";
import { useFormik } from "formik";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddressField({
  handleChange,
  value,
  error,
  name,
  handleBlur,
}) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [addressLoading, setAddressLoading] = React.useState(false);
  const [autoComplete, setAutoComplete] = React.useState({ status: false });
  const [inputValue, setInputValue] = React.useState("");

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 662,
    padding: "2rem  1rem",
    // height: ,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 9,
    p: 4,
  };

  const autoCompleteAddressHandler = (v) => {
    axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${v}.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=41.9102415&lon=12.395915&radius=100000000`
      )
      .then((response) => {
        setAutoComplete({
          status: true,
          response: response.data.results,
        });
      })
      .catch((er) => formik.setFieldValue("indirizzo", v));
  };

  const handleAddressChange = (e) => {
    if (!e?.target?.value) return;
    handleChange("indirizzo", e.target.value);
    setInputValue(e.target.value);
  };

  const fetch = React.useMemo(
    () =>
      debounce((value) => {
        if (value) autoCompleteAddressHandler(value);
      }, 400),
    []
  );

  const geoLocate = () => {
    setAddressLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const url = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=1000`;
        axios
          .get(url)
          .then((response) => {
            setAutoComplete({
              status: true,
              response: response.data.results,
            });
            // console.log(
            //   "🚀 ~ file: AddressField.jsx:75 ~ .then ~ response:",
            //   response.data.results
            // );
            const l = response?.data?.results?.map(
              (r) => `${r?.address.freeformAddress},${r?.address.country}`
            );

            if (l.length > 0) {
              //first index has highest score
              handleChange("indirizzo", l[0]);
            } else {
              setOpenSnackbar(true);
            }
            setAddressLoading(false);
          })
          .catch((er) => {
            setOpenSnackbar(true);
            setAddressLoading(false);
          });
      });
    } else {
      console.log("Not Available");
    }
  };

  useEffect(() => {
    if (inputValue) fetch(inputValue);
  }, [inputValue]);

  return (
    <>
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
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form />
        </Box>
      </Modal>
      <FormControl>
        <Autocomplete
          freeSolo
          value={value}
          onChange={(e, v) => {
            handleChange && handleChange("indirizzo", v);
          }}
          onInputChange={handleAddressChange}
          classes={{
            clearIndicator: "!text-[#8065C9] h",
          }}
          options={
            autoComplete.response?.map(
              (r) => `${r?.address.freeformAddress},${r?.address.country}`
            ) ?? []
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Città, indirizzo e CAP"
              name={name}
              className="overflow-hidden !pr-0"
              sx={{
                ".MuiAutocomplete-inputRoot": {
                  paddingRight: "0!important",
                },
                ".MuiFormHelperText-root ": {
                  minHeight: "23px!important",
                },
              }}
              onBlur={handleBlur}
              error={error}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <div className="flex flex-row items-center justify-center relative gap-2">
                      {/* <div className="relative flex-row flex gap-3 bg-white z-10"> */}
                      {addressLoading ? (
                        <CircularProgress
                          className="w-[20px]  text-[#886FCC] mx-auto"
                          sx={{
                            maxWidth: "20px!important",
                            maxHeight: "20px!important",
                          }}
                        />
                      ) : (
                        <>
                          <button
                            type="button"
                            className="active:text-[#B4B4B4] text-[#886FCC] active:border-[#B4B4B4]"
                            onClick={() => handleOpen()}
                          >
                            <CaWriting className="w-[20px]" />
                          </button>
                          <button
                            type="button"
                            className="active:text-[#B4B4B4] active:border-[#B4B4B4]"
                            onClick={() => geoLocate()}
                          >
                            <CaNearMe className="w-[20px]" />
                          </button>
                        </>
                      )}
                      {/* </div> */}
                      <Box
                        sx={{
                          ".MuiAutocomplete-endAdornment": {
                            position: "relative!important",
                            right: "0!important",
                            top: "0!important",
                          },
                          // "&>div": {
                          //   top: "0!important",
                          //   width: "2rem",
                          //   height: "2rem",
                          // },
                          // "&>div>button": {
                          //   top: "0!important",
                          //   width: "2rem",
                          //   height: "2rem",
                          //   fontSize: "2rem",
                          //   padding: "0",
                          //   marginBottom: "1rem",
                          // },
                          "&>div>button>svg": {
                            fontSize: "2rem",
                          },
                        }}
                        // className="my-auto right-[0.5rem] h-[2rem] w-[2rem] top-0 bottom-0"
                      >
                        {params.InputProps.endAdornment}
                      </Box>
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </>
  );

  function Form() {
    const formik = useFormik({
      initialValues: {
        indirizzo: "",
        civico: "",
        CAP: "",
        citta: "",
        stato: "",
      },

      initialErrors: true,
      validateOnChange: true,
      validateOnMount: true,
      validationSchema: Yup.object({
        indirizzo: Yup.string().required("Campo richiesto"),
        civico: Yup.string().required("Campo richiesto"),
        CAP: Yup.string().required("Campo richiesto"),
        citta: Yup.string().required("Campo richiesto"),
        stato: Yup.string().required("Campo richiesto"),
      }),
    });
    return (
      <Box
        sx={{
          ".MuiFormHelperText-root": {
            height: "0px!important",
          },
        }}
        className="grid grid-row-[auto_auto_59px] gap-8 py-5  h-full place-items-center"
      >
        <div className="flex flex-row gap-4">
          <TextField
            variant="outlined"
            placeholder="Via Roma"
            label="Indirizzo"
            name="indirizzo"
            onChange={formik.handleChange}
            // value={formik.values.indirizzo}3
            onBlur={formik.handleBlur}
            error={formik.errors.indirizzo && formik.touched.indirizzo}
            helperText={formik.touched.indirizzo && formik.errors.indirizzo}
          />
          <TextField
            variant="outlined"
            placeholder="10"
            label="Civico"
            name="civico"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.civico && formik.touched.civico}
            helperText={formik.touched.civico && formik.errors.civico}
          />
          <TextField
            variant="outlined"
            placeholder="12345"
            label="CAP"
            name="CAP"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.CAP && formik.touched.CAP}
            helperText={formik.touched.CAP && formik.errors.CAP}
          />
        </div>
        <div className="flex flex-row gap-4">
          <TextField
            variant="outlined"
            placeholder="Roma"
            label="Città"
            name="citta"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.citta && formik.touched.citta}
            helperText={formik.touched.citta && formik.errors.citta}
          />
          <TextField
            variant="outlined"
            placeholder="Roma"
            label="Stato"
            name="stato"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.stato && formik.touched.stato}
            helperText={formik.touched.stato && formik.errors.stato}
          />
        </div>
        <Button variant="contained" size="medium" className="w-[151px] mx-auto">
          Salva
        </Button>
      </Box>
    );
  }
}
