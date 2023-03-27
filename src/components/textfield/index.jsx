import { FormGroup, FormLabel, TextField as TF } from "@mui/material";
import cn from "classnames";
import { forwardRef } from "react";

import s from "./index.module.css";

export const TextField = forwardRef((props, ref) => {
  const { className, label, inputProps, ...rest } = props;
  return (
    <>
      <FormGroup className={cn(s.root, className)}>
        {label && <FormLabel className={s.label}>{label}</FormLabel>}
        <TF ref={ref} {...rest} inputProps={{ className: s.fieldInput, ...inputProps }} variant="standard" classes={{ root: s.fieldRoot }} />
      </FormGroup>
    </>
  );
});
