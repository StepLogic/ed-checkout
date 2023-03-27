import { ExpandMore } from "@mui/icons-material";
import { FormControl, FormLabel, MenuItem, Select as S, TextField } from "@mui/material";
import cn from "classnames";
import React from "react";

import { uuid } from "../../pages/utils/Utils";
import s from "./index.module.css";

export const Select = (props) => {
  const { className, placeholder, label, options = [], sx, ...rest } = props;

  return (
    <>
      <FormControl className={cn(s.root, className)}>
        {label && <FormLabel className={s.label}>{label}</FormLabel>}
        <TextField
          select
          {...rest}
          // IconComponent={}
          inputProps={{
            className: cn(s.fieldInput),
            // endAdornment: e,
          }}
          SelectProps={{
            IconComponent: ExpandMore,
          }}
          sx={{ marginTop: 0, ...sx }}
          variant="standard"
        >
          {options.map((item) => (
            <MenuItem key={uuid()} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </>
  );
};
