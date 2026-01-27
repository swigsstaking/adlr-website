const Logo = ({ className = "h-10" }) => {
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
};

export default Logo;
