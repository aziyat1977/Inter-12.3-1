import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  active = false, 
  variant = 'default',
  ...props 
}) => {
  const baseStyles = "px-5 py-2.5 rounded-full font-bold uppercase transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = "";
  if (variant === 'default') {
     variantStyles = active 
      ? "bg-accent text-white border-2 border-accent" 
      : "bg-transparent text-text border-2 border-accent hover:bg-accent hover:text-white";
  } else if (variant === 'outline') {
    variantStyles = "border-2 border-text text-text hover:bg-text hover:text-bg";
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};