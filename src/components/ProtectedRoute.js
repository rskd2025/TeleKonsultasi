// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredModules = [] }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isSuperAdmin = user?.role === 'superadmin';
  const modulAkses = user?.modulAkses || [];
  const groupAkses = user?.groupAkses || [];

  // Jika belum login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Superadmin boleh akses semua
  if (isSuperAdmin) {
    return children;
  }

  // Jika halaman tidak minta modul khusus (seperti Dashboard), semua user bisa akses
  if (requiredModules.length === 0) {
    return children;
  }

  // Cek apakah user punya akses
  const punyaAkses = requiredModules.some(
    (mod) => modulAkses.includes(mod) || groupAkses.includes(mod)
  );

  return punyaAkses ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
