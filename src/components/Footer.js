import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* Footer Static */}
      <div className="text-center py-2 bg-light" style={{ marginBottom: '30px' }}>
        <small>&copy; 2025 RSKD Provinsi Maluku</small>
      </div>

      {/* Footer Fixed Modern */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
          color: 'white',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 14px',
          zIndex: 1000,
          boxShadow: '0 -2px 6px rgba(0,0,0,0.2)',
        }}
      >
        {/* Kiri - Info Aplikasi */}
        <div style={{ width: '220px', textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Tele Konsultasi Kesehatan Mental
          </div>
          <div style={{ fontSize: '10px', opacity: 0.85 }}>
            RSKD Provinsi Maluku · versi 0.1 · 2025
          </div>
        </div>

        {/* Tengah - Marquee */}
        <div style={{ flexGrow: 1, padding: '0 12px' }}>
          <marquee behavior="scroll" direction="left" scrollamount="4">
            Tele Konsultasi Kesehatan Mental RSKD Provinsi Maluku — Data anda bersifat rahasia
          </marquee>
        </div>

        {/* Kanan - Tanggal dan Jam */}
        <div style={{ width: '200px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: '11px' }}>
          {formatDate(currentTime)} | {formatTime(currentTime)}
        </div>
      </div>
    </>
  );
};

export default Footer;
