import React from 'react';

const BentoItem = ({ children, className = "", span = "" }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] ${span} ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
      {children}
    </div>
  );
};

export default BentoItem;
