import React from 'react';
import Button from './orange-button';
import '../styles/Career-Guidance.css';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo/logo.svg`} alt="Logo" />
      </div>
      <div>
        <Button className="login-button">Log In</Button>
        <Button className="signup-button">Sign up</Button>
      </div>
    </header>
  );
};

export default Header;
