'use client';

import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'lightblue',
      color: 'white',
      // padding: '10px 20px',
      textAlign: 'center',
      position: 'sticky',
      top: '0',
      zIndex: '1000',
    }}>
      <p>Header</p>
    </header>
  );
};

export default Header;
