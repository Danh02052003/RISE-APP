import React from 'react';
import PropTypes from 'prop-types';
import '../styles/orange-button.css'
const Button = ({ className, onClick, children }) => {
  return (
    <button className={`auth-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
