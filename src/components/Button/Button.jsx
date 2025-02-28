// src/components/Button/Button.js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type = 'button', onClick, className, children }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
