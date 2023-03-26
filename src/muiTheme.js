import { createTheme } from "@mui/material/styles";

const purple = "#AE01FF";
const dark = "#000";
const green = "#008A00";
const yellow = "#F47500";
const darkBlack = "#0D0D0D";
const lightBlack = "#7D7878";
const lightBlue = "#0147FF";
const fadedWhite = "#F2F2F2";
const lighterBlack = "#A1A1A1";
export const muiTheme = createTheme({
  palette: {
    common: {
      darkBlack,
      lightBlack,
      fadedWhite,
      lighterBlack,
    },
    primary: {
      main: purple,
    },
    // secondary: {
    //   main: grey,
    // },
    // error: {
    //   main: red,
    // },

    secondary: {
      main: dark,
    },

    success: {
      main: green,
    },
    warning: {
      main: yellow,
    },
    info: {
      main: lightBlue,
    },
  },
  typography: {
    fontFamily: ["Lexend", "sans-serif"].join(", "),
    fontSize: 10,
    htmlFontSize: 10,
    h1: {
      fontSize: "clamp(3rem, 8vw, 6rem)",
      fontWeight: 700,
      color: "#fff",
      // lineHeight: "3rem",
    },
    h2: {
      fontSize: "clamp(1.4rem, 2vw, 2.7rem)",
      fontWeight: 600,
    },
    h3: {
      fontSize: "clamp(1.8rem, 2vw,2.25rem)",
      fontWeight: 400,
    },
    h4: {
      fontSize: "clamp(1.4rem,2vw,2rem)",
      fontWeight: 400,
    },
    h5: {
      fontSize: "clamp(1.3rem,2vw,1.6rem)",
      fontWeight: 400,
    },

    body1: {
      fontSize: "clamp(1.2rem,2vw,1.4rem)",
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "clamp(1.2rem,2vw, 1.4rem)",
      fontWeight: 500,
      lineHeight: 1.85,
    },
    body3: {
      fontSize: "clamp(1.2rem,2vw, 1.3rem)",
      fontWeight: 600,
      lineHeight: 0.7,
    },
    btn: {
      fontSize: "1.5rem",
      textTransform: "none",
      height: "5rem",
      borderRadius: 10,
      boxShadow: "0px 0px 4px -1px rgba(71,64,71,0.63)",
    },

    cardGridWrapper: {
      height: "100%",
      padding: "5rem 3rem",
      "@media(max-width:600px)": {
        padding: "3rem 2rem",
      },
      borderRadius: 20,
      boxShadow: "-1px 11px 30px 0px #e0e0e03b",
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        backgroundColor: "#E4E4E4",
        borderRadius: ".4rem",
      },
    },
    MuiPaper: {
      styleOverrides: {
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,.5),0px 8px 10px 1px rgba(0,0,0,0.01),0px 3px 14px 2px rgba(0,0,0,0.01)",
      },
    },
    MuiAvatar: {
      styleOverrides: {
        fontSize: "2rem",
        fontWeight: 500,
        "& .MuiAvatar-img": {
          objectFit: "contain",
        },
        // backgroundColor: "#FF9B04",
      },
    },
    MuiTooltip: {
      styleOverrides: {
        backgroundColor: "#FF9B04",
        color: "#fff",
        fontSize: { md: "1.5rem", xs: "1rem" },
      },
    },
  },
});
