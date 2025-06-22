// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredModules = [] }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔒 Belum login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { groupAkses = [], modulAkses = [] } = user;

  // ✅ Admin boleh akses semua
  if (groupAkses.includes('Admin')) {
    return children;
  }

  // ✅ Jika tidak butuh modul khusus, izinkan
  if (requiredModules.length === 0) {
    return children;
  }

  // 🔐 Cek apakah user punya akses ke salah satu modul
  const punyaAkses = requiredModules.some((modul) =>
    modulAkses.includes(modul)
  );

  if (!punyaAkses) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
