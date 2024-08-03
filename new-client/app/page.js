"use client";

import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/nav";
import FileUpload from "./components/upload/main";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff", // White
    },
    primary: {
      main: "#0000ff", // Blue
    },
    secondary: {
      main: "#add8e6", // Light blue
    },
    text: {
      primary: "#000000", // Black text color
    },
  },
  typography: {
    fontFamily: "Comic Sans MS",
  },
});

export default function Home() {
  const handle = async () => {
    console.log("handle");
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    console.log(data);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <header>
          <Navbar />
        </header>
        <Button onClick={handle}>asdfkl;jasdf</Button>
        <FileUpload />
      </Container>
    </ThemeProvider>
  );
}
