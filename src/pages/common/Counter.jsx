import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
function Counter({ onChange, enableCounter }) {
  const [value, setValue] = useState(1);
  useEffect(() => {
    onChange && onChange(value);
  }, [value]);
  return (
    <Box
      sx={{
        pointerEvents: enableCounter ? "auto" : "none",
        opacity: enableCounter ? "100%" : "0",
        gridTemplateColumns: "0.2fr 1fr 0.2fr",
      }}
      className=" h-[62px] max-w-[100%] grid gap-2 w-full relative"
    >
      <Button
        variant="contained"
        color="primary"
        className={"rounded-[9px]"}
        disabled={value == 1}
        onClick={() => setValue((r) => (r > 1 ? r - 1 : 1))}
      >
        <RemoveIcon />
      </Button>
      <input
        value={value}
        onChange={(event) =>
          setValue(
            Number(event?.target?.value) <= 1 ? 1 : Number(event?.target?.value)
          )
        }
        type="number"
        size="1"
        className=" flex min-w-0 rounded-[9px] text-[#2D224C] text-center text-[32px] bg-none"
      />
      <Button
        color="primary"
        variant="contained"
        className={"rounded-[9px]"}
        onClick={() => setValue((r) => r + 1)}
      >
        <AddIcon />
      </Button>
    </Box>
  );
}

export default Counter;
