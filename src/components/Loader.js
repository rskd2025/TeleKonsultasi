import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ text = 'Memuat...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'rgba(255,255,255,0.9)',
      zIndex: 9999,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
    }}>
      <Spinner animation="border" variant="primary" />
      <div className="mt-2">{text}</div>
    </div>
  );
};

export default Loader;
