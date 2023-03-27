import { createTheme } from "@mui/material/styles";

import PoppinsMedium from "@font/PoppinsMedium.ttf";
import PoppinsMediumItalic from "@font/Poppins-MediumItalic.ttf";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1920,
      xxxl: 2300,
      max: 3500,
    },
  },
  palette: {
    primary: {
      main: "#8065C9 !important",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2D224C !important",
      contrastText: "#fff",
    },
    buttonBack: {
      main: "#D9DAF3 !important",
      contrastText: "#8065C9 !important",
    },
    red: {
      main: "#E90000 !important",
      contrastText: "#fff !important",
    },
    green: {
      main: "#74DFAC !important",
      contrastText: "#fff !important",
    },
    button: {
      main: "#D4145A !important",
      contrastText: "#fff",
    },
    message: {
      main: "#4CAF50 !important",
    },
    white: {
      main: "#fff !important",
    },
    buttonGreen: {
      main: "#74DFAC !important",
      contrastText: "#31602A !important",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Poppins';
            font-style: normal;
            font-display: swap;
            font-weight: medium;
            src: local('Poppins'), url(${PoppinsMedium}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          },
            @font-face {
            font-family: 'Poppins';
            font-style: italic;
            font-display: swap;
            font-weight: medium;
            src: local('Poppins'), url(${PoppinsMediumItalic}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
    },
    MuiDesktopDatePicker: {
      styleOverrides: {
        root: {
          display: "none",
          "&.Mui-selected": {
            color: "white!important",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "white!important",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          ["@media (min-width:768px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "24px",
          },
          ["@media (min-width:1024px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "26px",
          },
          ["@media (min-width:1280px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "28px",
          },
          ["@media (min-width:1920px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "32px",
          },
          ["@media (min-width:2300px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "36px",
          },
          ["@media (min-width:3500px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "55px",
          },
          marginTop: 0,
          color: "#2D224C",
          fontSize: "19px",
          background: "transparent",
          "-webkit-text-fill-color": "#2D224C!important",
          ":-webkit-background-clip": "text",
          "&::after": {
            borderColor: "#8065C9 ",
          },
          "&::before": {
            borderColor: "#8065C9 ",
          },
          "&.Mui-error:after": {
            borderBottomColor: "#D4145A",
          },
          "&.Mui-error:before": {
            borderBottomColor: "#D4145A",
          },
          "&::focus": {
            background: "none",
          },
          // "&"
        },
        input: {
          "&::placeholder": {
            // opacity: "0.7",
            color: "#9691A6",
          },
          "-webkit-autofill": {
            transition: "6000s!important",
            animationName: "none!important",
          },
          "-webkit-autofill:focus": {
            transition:
              "background-color 600000s 0s, color 600000s 0s !important",
          },
          ":-internal-autofill-selected": {
            background: "none!important",
            backgroundColor: "rgba(0,0,0,0)!important",
          },
          background: "transparent!important",
          "-webkit-text-fill-color": "#2D224C!important",
          ":-webkit-background-clip": "text!important",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          marginTop: 0,
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "none",
          color: "#2D224C",
          "&.Mui-selected": {
            backgroundColor: "#8065C9",
            color: "white",
            "&.Mui-focusVisible": { backgroundColor: "#8065C9" },
            "&:hover": {
              backgroundColor: "#8065C9",
            },
          },

          "& .Mui-disabled": {
            backgroundColor: "none!important",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          color: "#D4145A",
          fontWeight: "500",
          marginLeft: "0",
          marginRight: "0",
          ["@media (min-width:768px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "15px",
          },
          ["@media (min-width:1920px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "18px",
          },
          ["@media (min-width:3500px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "28px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        disabled: {},
        root: {
          "&.Mui-disabled": {
            color: " rgba(73, 73, 73, 0.692)!important",
            backgroundColor: "rgba(150, 150, 150, 0.548) !important",
          },
        },
        sizeLarge: {
          fontSize: "15px",
          borderRadius: "11px",
          padding: "14px 22px",
          fontWeight: "600",
          ["@media (min-width:768px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "16px",
          },
          ["@media (min-width:1024px)"]: {
            // eslint-disable-line no-useless-computed-key
          },
          ["@media (min-width:1280px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "18px",
          },
          ["@media (min-width:1920px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "20px",
          },
          ["@media (min-width:2300px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "22px",
          },
          ["@media (min-width:3500px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "35px",
            padding: "20px 22px",
            borderRadius: "20px",
          },
        },
        sizeSmall: {
          ["@media (min-width:768px)"]: {
            // eslint-disable-line no-useless-computed-key
            minWidth: "7px",
            marginLeft: "13px",
            padding: "4px 6px",
          },
          ["@media (min-width:1024px)"]: {
            // eslint-disable-line no-useless-computed-key
            minWidth: "8px",
            padding: "6px 8px",
            marginLeft: "13px",
          },
          ["@media (min-width:1280px)"]: {
            // eslint-disable-line no-useless-computed-key
            minWidth: "10px",
            padding: "8px 10px",
            marginLeft: "13px",
          },
          ["@media (min-width:1920px)"]: {
            // eslint-disable-line no-useless-computed-key
            minWidth: "18px",
            padding: "14px 18px",
            marginLeft: "20px",
            aspectRatio: "1 / 1",
          },
          minWidth: "10px",
          padding: "12px 14px",
          borderRadius: "50%",
          color: "white",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "10px",
          ["@media (min-width:768px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "12px",
          },
          ["@media (min-width:2300px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "14px",
          },
          ["@media (min-width:3500px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "26px",
            marginBottom: "0.5rem",
          },
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: "20px",
          transform: "translate(50%,-50%)",
          ["@media (min-width:2300px)"]: {
            // eslint-disable-line no-useless-computed-key
            right: "25.5px",
          },
          ["@media (min-width:3500px)"]: {
            // eslint-disable-line no-useless-computed-key
            right: "48px",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          ["@media (min-width:3500px)"]: {
            // eslint-disable-line no-useless-computed-key
            fontSize: "5rem",
            "&.pb-1": {
              fontSize: "3rem",
            },
            "&.mr-2": {
              fontSize: "3rem",
            },
            "&.check": {
              fontSize: "3rem",
            },
          },
        },
      },
    },
  },
});
