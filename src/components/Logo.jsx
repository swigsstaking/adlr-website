import { useState } from 'react';

const LOGO_URL = 'https://swigs.online/uploads/adlr/1769542860754-268933200.webp';

const Logo = ({ className = "h-10" }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback to text logo if image fails
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <span className="font-display text-3xl font-bold tracking-tight text-dark-900">
          ADLR
        </span>
        <span className="text-[10px] text-dark-500 uppercase tracking-[0.2em]">
          Cosmetic Automobile
        </span>
      </div>
    );
  }

  return (
    <img
      src={LOGO_URL}
      alt="ADLR Cosmetic Automobile"
      className={className}
      onError={() => setImageError(true)}
    />
  );
};

export default Logo;
