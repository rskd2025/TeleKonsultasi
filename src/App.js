// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { IdleTimerProvider } from 'react-idle-timer';

// ✅ Halaman
import Dashboard from './pages/Dashboard';
import PendaftaranPasien from './pages/PendaftaranPasien';
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
import Loader from './components/Loader';
import { useLoading } from './components/LoadingContext';

// ✅ Notifikasi
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LayoutWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  const hideHeaderFooter = ['/login', '/unauthorized'].includes(location.pathname);

  // ⏳ Tampilkan loading saat ganti halaman
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [setLoading, location.pathname]);

  // 🔐 Redirect ke login kalau belum login dan akses root "/"
  useEffect(() => {
    if (!isLoggedIn && location.pathname === '/') {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, location]);

  // ⏱ Logout otomatis jika idle (10 menit)
  const handleIdle = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <IdleTimerProvider timeout={10 * 60 * 1000} onIdle={handleIdle} debounce={500}>
      {loading && <Loader text="Memuat halaman..." />}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isLoggedIn && !hideHeaderFooter && <Header />}

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={
              <div className="text-center mt-5">
                <h2>❌ Akses Ditolak</h2>
                <p>Anda tidak memiliki hak untuk mengakses halaman ini.</p>
              </div>
            } />
            <Route path="/" element={<ProtectedRoute requiredModules={[]}><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute requiredModules={[]}><Dashboard /></ProtectedRoute>} />
            <Route path="/pendaftaran-pasien" element={<ProtectedRoute requiredModules={["Input Pasien"]}><PendaftaranPasien /></ProtectedRoute>} />
            <Route path="/kunjungan-pasien" element={<ProtectedRoute requiredModules={["Kunjungan Pasien"]}><KunjunganPasien /></ProtectedRoute>} />
            <Route path="/pengguna" element={<ProtectedRoute requiredModules={["Pengguna"]}><Pengguna /></ProtectedRoute>} />
            <Route path="/faskes" element={<ProtectedRoute requiredModules={["Faskes"]}><Faskes /></ProtectedRoute>} />
            <Route path="/menu" element={<ProtectedRoute requiredModules={["admin"]}><Menu /></ProtectedRoute>} />
            <Route path="/manajemen-pengguna" element={<ProtectedRoute requiredModules={["admin"]}><ManajemenPengguna /></ProtectedRoute>} />
            <Route path="/history-pasien" element={<ProtectedRoute requiredModules={["History Pasien"]}><HistoryPasien /></ProtectedRoute>} />
            <Route path="/input-pemeriksaan" element={<ProtectedRoute requiredModules={["Input Pasien"]}><InputPemeriksaan /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute requiredModules={["Feedback Konsul"]}><Feedback /></ProtectedRoute>} />
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
    </IdleTimerProvider>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
