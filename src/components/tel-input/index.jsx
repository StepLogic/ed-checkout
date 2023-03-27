import { FormGroup, FormLabel } from "@mui/material";
import cn from "classnames";
import { MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";

import s from "./index.module.css";

export const TelField = (props) => {
  const { className, placeholder, label, onChange, ...rest } = props;
  const [value, setValue] = useState(placeholder);

  const handleChange = (v, info) => {
    setValue(v);
    onChange && onChange(v, info);
  };

  return (
    <>
      <FormGroup className={cn(s.root, className)}>
        {label && <FormLabel className={s.label}>{label}</FormLabel>}
        <MuiTelInput
          defaultCountry={"IT"}
          value={value}
          placeholder={placeholder}
          variant="standard"
          onChange={(v, info) => {
            handleChange(v, info);
          }}
          {...rest}
        />
      </FormGroup>
    </>
  );
};
