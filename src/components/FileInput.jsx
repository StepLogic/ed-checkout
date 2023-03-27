import { FormControl, FormHelperText, FormLabel, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { components } from "react-select";
import TimezoneSelect, { allTimezones } from "react-timezone-select";

const object = {
  value: "Europe/Amsterdam",
  label: "(GMT+1:00) Rome, Amsterdam, Berlin, Bern, Stockholm, Vienna",
  offset: 1,
  abbrev: "CET",
  altName: "Central European Standard Time",
};

const FileInput = (props) => {
  const { className, error, helperText, label, value, onChange, ...rest } = props;
  const [file, setFile] = useState(null);
  // const [fileName, setFileName] = useState("");
  const onFileSelected = (events) => {
    const f = events.target.files[0];
    //
    if (f && f !== null) {
      setFile(f);
      onChange && onChange(f);
    }
  };

  return (
    <>
      <FormControl
        sx={{
          display: "grid",
          gridColumnTemplate: "1fr",
        }}
      >
        {label && (
          <FormLabel
            sx={{
              fontFamily: "Poppins",
              fontSize: "13px",
              color: "#2D224C!important",
              fontWeight: "500",
            }}
          >
            {label}
          </FormLabel>
        )}
        <Box className="flex  flex-row gap-4 my-[5px]">
          <Button
            disableElevation
            variant="contained"
            className="!w-[355px]"
            component="label"
            sx={
              file === null
                ? {
                    color: " rgba(73, 73, 73, 0.692)!important",
                    backgroundColor: "rgba(150, 150, 150, 0.548) !important",
                  }
                : {}
            }
          >
            Upload a Screenshot
            <input accept="image/png,image/jpeg" onChange={onFileSelected} type="file" hidden />
          </Button>

          <TextField
            placeholder="No File Selected"
            className="w-full"
            variant="standard"
            sx={{
              "& input": {
                fontSize: "18px",
              },
            }}
            value={file?.name || ""}
            // onChange={(event) => setFileName(event.target.value)}
          />
        </Box>
        {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default FileInput;
