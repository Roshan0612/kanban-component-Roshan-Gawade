import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  return (
    <button
      {...rest}
      className={`px-3 py-1.5 rounded-md bg-primary-500 text-white text-sm hover:bg-primary-600 focus-visible ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
