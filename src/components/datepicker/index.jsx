import "moment/dist/locale/it";
import "moment/dist/locale/en-gb";

import { FormGroup, FormLabel } from "@mui/material";
import {
  DesktopDatePicker,
  itIT,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import cn from "classnames";
import moment from "moment";
import React, { useState, useEffect } from "react";

import { TextField } from "../textfield";
import s from "../textfield/index.module.css";

// moment.locale("it");
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
export const DatePicker = (props) => {
  const { className, label, onChange, isItalian, ...rest } = props;

  const [_value, _setValue] = useState(props.value === "" ? null : props.value);
  const [locale, setLocale] = useState("en-gb");
  // language === "IT" &&
  useEffect(() => {
    console.log("it", isItalian);
    if (isItalian) {
      moment.locale("it");
      setLocale("it");
      return;
    }
    moment.locale("en-gb");
    setLocale("en-gb");
    return;
  }, [isItalian]);

  return (
    <>
      <LocalizationProvider
        adapterLocale={locale}
        localeText={
          itIT.components.MuiLocalizationProvider.defaultProps.localeText
        }
        dateAdapter={AdapterMoment}
      >
        {/* <DP
          {...rest}
          disableFuture
          openTo="year"
          inputFormat="DD/MM/YYYY"
          views={["day", "month", "year"]}
          value={_value}
          onChange={(newValue) => {
            _setValue(newValue);
            if (newValue !== null) onChange && onChange(newValue);
          }}
          renderInput={({ inputRef, inputProps }) => (
            <TextField
              label={label}
              ref={inputRef}
              // sx={sx}
              // helperText={helperText}
              // name={name}
              // startAdornment={
              //   <InputAdornment position="start">
              //     <CalendarTodayIcon />
              //   </InputAdornment>
              // }
              // error={error}
              inputProps={{
                ...inputProps,
              }}
            />
          )}
        /> */}

        <FormGroup className={cn(s.root, className)}>
          {label && <FormLabel className={s.label}>{label}</FormLabel>}
          <DesktopDatePicker
            disableFuture
            // sx={[
            //   {
            //     "& .MuiInputBase-root::after": {
            //       border: "none!important",
            //     },
            //   },
            //   sx,
            // ]}
            openTo="year"
            maxDate={new Date()}
            // inputFormat="DD/MM/YYYY"
            views={["year", "month", "day"]}
            value={_value}
            // sx={{
            //   display: "none",
            //   "&.Mui-selected": {
            //     color: "white",
            //   },
            // }}

            onChange={(newValue) => {
              _setValue(newValue);
              if (newValue !== null) onChange && onChange(newValue);
            }}
            renderInput={(inputProps) => (
              <TextField {...rest} {...inputProps} />
            )}
          />
        </FormGroup>
      </LocalizationProvider>
    </>
  );
};
