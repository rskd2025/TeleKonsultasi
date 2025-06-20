import React, { useEffect, useState } from 'react';
import './Footer.css'; // pastikan ini sudah ada

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
      <div className="footer">
        {/* Kiri - Info Aplikasi */}
        <div style={{ width: '220px', textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
            TeleKonsultasi Kesehatan Mental
          </div>
          <div style={{ fontSize: '10px', opacity: 0.85 }}>
            RSKD Provinsi Maluku · versi 0.1 · 2025
          </div>
        </div>

        {/* Tengah - Scroll Text */}
        <div className="marquee-text">
          <p>
            TeleKonsultasi Kesehatan Mental RSKD Provinsi Maluku — Data anda bersifat rahasia
          </p>
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
