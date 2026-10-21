import React from 'react';

const Container = ({ className = '', children }) => {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
