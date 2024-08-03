import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import { NavButton, AuthButton, Logo } from './styles';

const NavbarContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderRadius: '25px',
  border: '2px solid #ADD8E6',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  maxWidth: '100%', 
  margin: '20px auto',
  height: '60px',
});

const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const Navbar = () => {
    return (
      <NavbarContainer>
        <LeftSection>
          <Logo src="/groceries.svg" onClick={() => window.location.href = '/'} />
          <Link href="/mypantry" passHref>
            <NavButton component="a">My Pantry</NavButton>
          </Link>
          <Link href="/recipes" passHref>
            <NavButton component="a">Recipes</NavButton>
          </Link>
          {/* <Link href="/shoppinglist" passHref>
            <NavButton component="a">Shopping List</NavButton>
          </Link> */}
        </LeftSection>
        <RightSection>
          <Link href="/login" passHref>
            <AuthButton component="a">Login</AuthButton>
          </Link>
          <Link href="/signup" passHref>
            <AuthButton component="a" variant="contained" color="secondary">Sign Up</AuthButton>
          </Link>
        </RightSection>
      </NavbarContainer>
    );
  };
  
  export default Navbar;