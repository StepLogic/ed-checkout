import { TextField } from "@components/textfield";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Box, FormControl, FormHelperText } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useMemo } from "react";

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

  const autoCompleteAddressHandler = (v) => {
    axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${v}.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=41.9102415&lon=12.395915&radius=100000000`
      )
      .then((response) => {
        console.log("response", v, response);
        setAutoComplete({
          status: true,
          response: response.data.results,
        });
      })
      .catch((er) => formik.setFieldValue("indirizzo", v));
  };

  const handleAddressChange = (e) => {
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
            console.log("response", position, response);
            setAutoComplete({
              status: true,
              response: response.data.results,
            });
            const l = response?.data?.results?.map(
              (r) =>
                `${r?.address.freeformAddress}${
                  r?.address?.postalCode ? " , " + r?.address?.postalCode : ""
                }`
            );

            if (l.length > 0) {
              //first index has highest score ,hence the closest location
              handleChange(name, l[0]);
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
      <FormControl>
        <Autocomplete
          freeSolo
          value={value}
          onChange={(e, v) => {
            handleChange && handleChange(name, v);
          }}
          onInputChange={handleAddressChange}
          classes={{
            clearIndicator: "!text-[#8065C9] h",
          }}
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
              placeholder="Città, indirizzo e CAP"
              name={name}
              className="overflow-hidden"
              sx={{
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
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </>
  );
}
