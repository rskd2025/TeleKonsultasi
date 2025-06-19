import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// ✅ Halaman
import Dashboard from './pages/Dashboard';
import DaftarPasien from './pages/DaftarPasien';
import KunjunganPasien from './pages/KunjunganPasien';
import Pengguna from './pages/Pengguna';
import Faskes from './pages/Faskes';
import Menu from './pages/Menu';
import ManajemenPengguna from './pages/ManajemenPengguna';
import Login from './pages/Login';
import HistoryPasien from './pages/HistoryPasien';
import InputPemeriksaan from './pages/InputPemeriksaan';
import Feedback from './pages/Feedback';

// ✅ Komponen layout
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// ✅ Notifikasi
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Layout responsif dan scroll
function LayoutWrapper() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const hideHeaderFooter = ['/login', '/unauthorized'].includes(location.pathname);
  const isLoggedIn = !!user;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isLoggedIn && !hideHeaderFooter && <Header />}

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/unauthorized"
            element={
              <div className="text-center mt-5">
                <h2>❌ Akses Ditolak</h2>
                <p>Anda tidak memiliki hak untuk mengakses halaman ini.</p>
              </div>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute requiredModules={[]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredModules={[]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/daftar-pasien"
            element={
              <ProtectedRoute requiredModules={['Input Pasien']}>
                <DaftarPasien />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kunjungan-pasien"
            element={
              <ProtectedRoute requiredModules={['Kunjungan Pasien']}>
                <KunjunganPasien />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pengguna"
            element={
              <ProtectedRoute requiredModules={['Pengguna']}>
                <Pengguna />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faskes"
            element={
              <ProtectedRoute requiredModules={['Faskes']}>
                <Faskes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoute requiredModules={['admin']}>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manajemen-pengguna"
            element={
              <ProtectedRoute requiredModules={['admin']}>
                <ManajemenPengguna />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history-pasien"
            element={
              <ProtectedRoute requiredModules={['History Pasien']}>
                <HistoryPasien />
              </ProtectedRoute>
            }
          />
          <Route
            path="/input-pemeriksaan"
            element={
              <ProtectedRoute requiredModules={['Input Pasien']}>
                <InputPemeriksaan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback-konsul"
            element={
              <ProtectedRoute requiredModules={['Feedback Konsul']}>
                <Feedback />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {isLoggedIn && !hideHeaderFooter && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

// ✅ Entry point aplikasi
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
