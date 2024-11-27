import React from "react";
import Button from "../orange-button";
import "../../styles/Career-Guidance.css";
import logo from "../../Assets/icon/logo/logo.svg";
const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div>
        <Button className="login-button">Log In</Button>
        <Button className="signup-button">Sign up</Button>
      </div>
    </header>
  );
};

export default Header;
