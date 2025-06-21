import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredModules = [] }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔒 Belum login
  if (!user) {
    return <Navigate to="/login" />;
  }

  const { groupAkses = [], modulAkses = [] } = user;

  // ✅ Admin selalu punya akses
  if (groupAkses.includes('Admin')) {
    return children;
  }

  // ✅ Jika tidak butuh modul khusus, izinkan akses
  if (requiredModules.length === 0) {
    return children;
  }

  // 🔐 Cek apakah user punya akses salah satu dari requiredModules
  const punyaAkses = requiredModules.some(
    (modul) => modulAkses.includes(modul)
  );

  if (!punyaAkses) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
