import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function Counter({
  onChange,
  enableCounter = false,
  showCounter,
  enable_quantity = false,
}) {
  const [value, setValue] = useState(1);
  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  const MAX_QUANTITY = enable_quantity ? 25 : 1;

  return (
    <Box
      sx={{
        pointerEvents: enableCounter ? "auto" : "none",
        opacity: showCounter ? "100%" : "0",
        gridTemplateColumns: enableCounter
          ? "auto 40px 50px 40px"
          : "auto 45px",
        borderRadius: "9px",
        background: "#ffffff",
        // height: "100%",
        width: "100%",
        height: "62px",
        paddingRight: "min(2vw,1.5rem)",
        paddingLeft: "min(2vw,1.5rem)",
      }}
      className=" h-[62px]  max-w-[100%] grid gap-2  items-center w-full relative"
    >
      <p className="text-lg text-[#2D224C] font-semibold ml-4 my-auto">
        Quantità
      </p>
      {enableCounter ? (
        <>
          <Button
            variant="outlined"
            color="primary"
            className={
              "rounded-[9px] !min-w-[40px]  !h-[40px] !border-[3px] !border-[#8065C9] border-solid"
            }
            sx={{
              pointerEvents: value != 1 ? "auto" : "none",
              opacity: value != 1 ? "100%" : "10%",
            }}
            onClick={() => setValue((r) => (r > 1 ? r - 1 : 1))}
          >
            <RemoveIcon />
          </Button>
          <input
            value={value}
            onChange={(event) =>
              setValue(
                Number(event?.target?.value) <= 1
                  ? 1
                  : Number(event?.target?.value) >= MAX_QUANTITY
                  ? MAX_QUANTITY
                  : Number(event?.target?.value)
              )
            }
            type="number"
            size="1"
            className="flex min-w-0 rounded-[9px] text-[#2D224C] text-center text-[24px] bg-none"
          />
          <Button
            color="primary"
            sx={{
              pointerEvents:
                value != MAX_QUANTITY && enableCounter ? "auto" : "none",
              opacity: value != MAX_QUANTITY && enableCounter ? "100%" : "10%",
            }}
            variant="outlined"
            className={
              "rounded-[9px] !min-w-[40px] !h-[40px] !border-[3px] !border-[#8065C9] border-solid"
            }
            onClick={() =>
              setValue((r) => (r + 1 >= MAX_QUANTITY ? MAX_QUANTITY : r + 1))
            }
          >
            <AddIcon />
          </Button>
        </>
      ) : (
        <div className="flex flex-row items-center">
          <CloseIcon sx={{ color: "#8065C9" }} />
          <p className="text-[#2D224C] text-center text-[32px]">{value}</p>
        </div>
      )}
    </Box>
  );
}

export default Counter;
