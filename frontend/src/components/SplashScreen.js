import React from 'react';
import logo from '../assets/0.png'; // Pastikan path-nya benar

const SplashScreen = () => {
  return (
    <div
      style={{
        backgroundColor: '#cce6ff',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '100px', // Konten sedikit lebih tinggi dari tengah
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '400px',
          maxWidth: '80%',
          marginBottom: '2px', // Lebih dekat ke bar
        }}
      />
      <div
        style={{
          width: '250px', // Lebih panjang
          height: '10px', // Lebih tebal
          backgroundColor: '#007bff',
          borderRadius: '5px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#0056b3',
            animation: 'barAnim 2s linear forwards',
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes barAnim {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
