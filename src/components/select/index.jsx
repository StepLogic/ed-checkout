import { ExpandMore } from "@mui/icons-material";
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select as S,
  TextField,
} from "@mui/material";
import cn from "classnames";
import React from "react";

import { uuid } from "../../pages/utils/Utils";
import s from "./index.module.css";

export const Select = (props) => {
  const {
    className,
    label,
    placeholder,
    variant = "standard",
    options = [],
    sx,
    ...rest
  } = props;

  return (
    <>
      <FormControl className={cn(s.root, className)}>
        {label && (
          <FormLabel
            className={cn(s.label, { [s.outlined]: variant === "outlined" })}
          >
            {label}
          </FormLabel>
        )}
        <TextField
          select
          displayEmpty={true}
          {...rest}
          placeholder="Hello"
          inputProps={{
            className: cn(s.fieldInput),
          }}
          SelectProps={{
            IconComponent: ExpandMore,
          }}
          sx={{ marginTop: 0, ...sx }}
          variant={variant}
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
export default Select;
