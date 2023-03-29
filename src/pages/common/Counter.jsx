import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
function Counter({ onChange }) {
  const [value, setValue] = useState(0);
  return (
    <Box
      sx={{
        gridTemplateColumns: "0.2fr 1fr 0.2fr",
      }}
      className=" h-[62px] max-w-[100%] grid gap-2 w-full"
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setValue((r) => r - 1)}
      >
        <RemoveIcon />
      </Button>
      <input
        value={value}
        onChange={(event) => setValue(Number(event?.target?.value))}
        type="number"
        className="rounded-[9px] text-[#2D224C] text-center max-w-[190px]  lg:max-w-[300px] text-[32px] bg-none"
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => setValue((r) => r + 1)}
      >
        <AddIcon />
      </Button>
    </Box>
  );
}

export default Counter;
