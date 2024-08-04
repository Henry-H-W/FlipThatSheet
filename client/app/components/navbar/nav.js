import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { NavButton, AuthButton, Logo } from './styles';

const NavbarContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  borderRadius: "25px",
  border: "2px solid #ADD8E6",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  maxWidth: "100%",
  margin: "20px auto",
  height: "60px",
});

const LeftSection = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const RightSection = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const Navbar = () => {
  const { user, isLoading } = useUser();

  const handleLogin = () => {
    // Redirect to Auth0 login page
    window.location.href = '/api/auth/login';
  };

  const handleLogout = () => {
    // Redirect to Auth0 logout page
    window.location.href = '/api/auth/logout';
  };

  if (isLoading) return null; // Optionally render a loading state

  return (
    <NavbarContainer>
      <LeftSection>
        <Logo src="/music.svg" onClick={() => window.location.href = '/'} />
        <Link href="/music" passHref>
          <NavButton component="a">Music</NavButton>
        </Link>
        <Link href="/recordings" passHref>
          <NavButton component="a">Recordings</NavButton>
        </Link>
      </LeftSection>
      <RightSection>
        {!user ? (
          <AuthButton component="a" variant="contained" color="secondary" onClick={handleLogin}>
            Login
          </AuthButton>
        ) : (
          <AuthButton component="a" onClick={handleLogout}>
            Log Out
          </AuthButton>
        )}
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;
