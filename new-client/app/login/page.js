'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Link, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import Navbar from "../components/navbar/nav";
import { useUser } from "@auth0/nextjs-auth0/client";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1089d3', // Replace with your primary color
    },
    secondary: {
      main: '#18b1d1', // Replace with your secondary color
    },
  },
});

const Login = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/profile'); // Redirect authenticated users to their profile or another page
    }
  }, [user, router]);

  const handleLogin = () => {
    // Redirect to Auth0 login page
    router.push('/api/auth/login');
  };

  const handleGoogleLogin = () => {
    // Redirect to Auth0 login page with Google connection
    router.push('/api/auth/login?connection=google-oauth2');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Navbar />
        <Box
          sx={{
            maxWidth: 350,
            background: 'linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%)',
            borderRadius: '40px',
            padding: '25px 35px',
            border: '5px solid rgb(255, 255, 255)',
            boxShadow: '0px 30px 30px -20px rgba(133, 189, 215, 0.878)',
            margin: '80px auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary.main" sx={{ fontWeight: 900, fontSize: 30 }}>
            Welcome Back
          </Typography>
          <Button
            onClick={handleLogin}
            fullWidth
            variant="contained"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)',
              color: 'white',
              padding: '15px 0',
              margin: '20px auto',
              borderRadius: '20px',
              boxShadow: 'rgba(133, 189, 215, 0.878) 0px 20px 10px -15px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 'rgba(133, 189, 215, 0.878) 0px 23px 10px -20px',
              },
              '&:active': {
                transform: 'scale(0.95)',
                boxShadow: 'rgba(133, 189, 215, 0.878) 0px 15px 10px -10px',
              },
            }}
          >
            Sign In
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', flex: 1, mb: 2.5 }} />
            <Typography variant="body2" sx={{ mx: 2, fontWeight: 'bold' }}>OR</Typography>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', flex: 1, mb: 2.5 }} />
          </Box>
          <Button
            onClick={handleGoogleLogin}
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              py: 2.5,
              borderRadius: '8px',
              textTransform: 'none',
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              '&:active': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            Continue with Google
          </Button>
          <Box textAlign="left" sx={{ marginTop: 1, marginLeft: 1 }}>
            <Link href="#" variant="body2" sx={{ fontSize: 11, color: '#0099ff', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link href="/register" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Sign up</Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;