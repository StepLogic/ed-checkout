import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { useState } from "react";
import { components } from "react-select";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { theme } from "../assets/theme/theme";
const object = {
  value: "Europe/Amsterdam",
  label: "(GMT+1:00) Rome, Amsterdam, Berlin, Bern, Stockholm, Vienna",
  offset: 1,
  abbrev: "CET",
  altName: "Central European Standard Time",
};

export const TimeZoneCustomStyle = {
  control: (provided, state) => ({
    ...provided,
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    // paddingBottom: "1px",
    // borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
    borderBottom: "none",
    borderRadius: 0,
    width: "100%",
    boxShadow: "none",
    position: "relative",
    height: "49.25px",
    cursor: "pointer",
    padding: "4px 0",
    overflow: "hidden",
    "& > div >div[data-value]": {
      padding: "0",
      margin: "0",
    },
    "&> div": {
      padding: "0",
      margin: "0",
    },
    "&:hover::before": {
      borderBottom: !state.isFocused && "2px solid rgba(0, 0, 0, 0.87)",
    },
    "&::before": {
      content: `" "`,
      position: "absolute",
      right: "0",
      left: "0",
      bottom: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    "&::after": {
      content: `" "`,
      position: "absolute",
      right: "0",
      left: "0",
      bottom: "0",
      transform: state.isFocused ? "scaleX(1) translateX(0)" : "scaleX(0)",
      borderBottom:
        state.isFocused && `2px solid ${theme.palette.primary.main}`,
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "rgba(0, 0, 0, 0.54)",
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
  indicatorSeparator: () => ({}),
  option: (provided, state) => ({
    ...provided,
    // color: state.isSelected ? "white" : "#8065C9",
    backgroundColor: state.isSelected && "#8065C9",
    "&:hover": {
      backgroundColor: !state.isSelected && "rgba(128, 101, 201, 0.12)",
    },
  }),
  selectContainer: (provided, state) => ({
    ...provided,
    width: "100%",
  }),

  input: (provided, state) => ({
    ...provided,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    maxWidth: "max(40vw,250px)",
    color: "#2D224C",
    margin: "0",
    fontSize: "28px",
    "@media only screen and (max-width: 740px)": {
      fontSize: "19px",
    },
  }),
  //   valueContainer: () => ({}),
  menu: (provided, state) => ({
    ...provided,
  }),
};

const TimeZones = (props) => {
  const { className, error, helperText, label, value, onChange, ...rest } =
    props;
  const [_value, setValue] = useState(object);
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      // paddingBottom: "1px",
      // borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
      borderBottom: "none",
      borderRadius: 0,
      width: "100%",
      boxShadow: "none",
      position: "relative",
      height: "49.25px",
      cursor: "pointer",
      padding: "4px 0",
      overflow: "hidden",
      "& > div >div[data-value]": {
        padding: "0",
        margin: "0",
      },
      "&> div": {
        padding: "0",
        margin: "0",
      },
      "&:hover::before": {
        borderBottom: !state.isFocused && "2px solid rgba(0, 0, 0, 0.87)",
      },
      "&::before": {
        content: `" "`,
        position: "absolute",
        right: "0",
        left: "0",
        bottom: "0",
        borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
        transition:
          "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
      "&::after": {
        content: `" "`,
        position: "absolute",
        right: "0",
        left: "0",
        bottom: "0",
        transform: state.isFocused ? "scaleX(1) translateX(0)" : "scaleX(0)",
        borderBottom:
          state.isFocused && `2px solid ${theme.palette.primary.main}`,
        transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "rgba(0, 0, 0, 0.54)",
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
    indicatorSeparator: () => ({}),
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? "white" : "#8065C9",
      backgroundColor: state.isSelected && "#8065C9",
      "&:hover": {
        backgroundColor: !state.isSelected && "rgba(128, 101, 201, 0.12)",
      },
    }),
    selectContainer: (provided, state) => ({
      ...provided,
      width: "100%",
    }),

    input: (provided, state) => ({
      ...provided,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      maxWidth: "max(40vw,250px)",
      color: _value.label === object.label ? "#9691A6" : "#2D224C",
      margin: "0",
      fontSize: "28px",
      "@media only screen and (max-width: 740px)": {
        fontSize: "19px",
      },
    }),
    //   valueContainer: () => ({}),
    menu: (provided, state) => ({
      ...provided,
    }),
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
              color: theme.palette.secondary.main,
              fontWeight: "500",
            }}
          >
            {label}
          </FormLabel>
        )}

        <TimezoneSelect
          menuPosition="fixed"
          labelStyle="original"
          // disabledKeyboardNavigation
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     e.preventDefault();
          //     plusCounterHandler();
          //     return false;
          //   }
          // }}
          value={_value}
          onChange={(v) => {
            setValue(v);
            onChange && onChange(v);
          }}
          styles={customStyle}
          components={{
            Control: ({ children, ...props }) => (
              <Control
                css={{
                  border: "none",
                }}
                {...props}
              >
                {children}
              </Control>
            ),
          }}
          timezones={{
            ...allTimezones,
            "Europe/Amsterdam":
              "Rome, Amsterdam, Berlin, Bern, Stockholm, Vienna",
          }}
          {...rest}
        />
        {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};
function Control(props) {
  const { children, rootClassName } = props;
  return <components.Control {...props}>{children}</components.Control>;
}

export default TimeZones;
