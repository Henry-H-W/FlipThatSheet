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
        <Box textAlign="center" mt={5}>
          <Typography variant="h2" gutterBottom>
            Welcome to FlipThatSheet
          </Typography>
          <Typography variant="h6" gutterBottom>
            Easily turn your music sheets hands-free with head movements.
          </Typography>
          <Button variant="contained" color="secondary" href="/signup">
            Get Started
          </Button>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Upload Your Music
              </Typography>
              <Typography>
                Store all your music for free with our cloud app
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Access to our FlipThatSheet Feature
              </Typography>
              <Typography>Turn those pages hands free!</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Improve Your Posture
              </Typography>
              <Typography>Record videos to improve your posture</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
