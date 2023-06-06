import { FormGroup, FormLabel, TextField as TF } from "@mui/material";
import cn from "classnames";
import { forwardRef } from "react";

import s from "./index.module.css";

export const TextField = forwardRef((props, ref) => {
  const { className, label, variant = "standard", inputProps, ...rest } = props;
  return (
    <>
      <FormGroup className={cn(s.root, className)}>
        {label && (
          <FormLabel
            className={cn(s.label, { [s.outlined]: variant === "outlined" })}
          >
            {label}
          </FormLabel>
        )}
        <TF
          ref={ref}
          inputProps={{ className: s.fieldInput, ...inputProps }}
          variant={variant}
          classes={{ root: s.fieldRoot }}
          {...rest}
        />
      </FormGroup>
    </>
  );
});
export default TextField;
