import { forwardRef } from 'react';

const Card = forwardRef(({ children, className = '', hover = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`glass-card ${hover ? 'hover:transform hover:-translate-y-2' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;

