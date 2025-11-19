const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    light: 'bg-white text-navy hover:bg-cream shadow-lg hover:shadow-xl',
    outline: 'btn-outline',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

