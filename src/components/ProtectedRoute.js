import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredModules = [] }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔒 Jika belum login, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" />;
  }

  const modulAkses = user.modulAkses || [];
  const groupAkses = user.groupAkses || [];

  // ✅ Jika halaman tidak mensyaratkan modul khusus, izinkan akses
  if (requiredModules.length === 0) {
    return children;
  }

  // ✅ Cek apakah user punya salah satu modul atau grup akses
  const punyaAkses = requiredModules.some(
    (mod) => modulAkses.includes(mod) || groupAkses.includes(mod)
  );

  // ✅ Jika tidak punya akses, tetap tampilkan (biarkan halaman kosong)
  return children;
};

export default ProtectedRoute;
