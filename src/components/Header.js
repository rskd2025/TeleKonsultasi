import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Jika user tidak login, paksa keluar ke /login
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Fungsi bantu untuk kapitalisasi dan role-friendly
  const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formatRole = (role) => {
    if (!role) return '';
    switch (role.toLowerCase()) {
      case 'superadmin':
        return 'Administrator';
      case 'psikolog':
        return 'Psikolog';
      case 'psikiater':
        return 'Psikiater';
      case 'perawat':
        return 'Perawat Jiwa';
      case 'dokter':
        return 'Dokter';
      default:
        return capitalize(role);
    }
  };

  return (
    <Navbar
      expand="lg"
      style={{
        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
      className="py-2"
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Kiri: Info Pengguna */}
        <div
          className="fw-semibold text-truncate"
          style={{ fontSize: '0.9rem', color: 'white', maxWidth: '70%' }}
        >
          {capitalize(user?.nama_lengkap)} | {formatRole(user?.role)}
        </div>

        {/* Kanan: Tombol Logout */}
        <Button
          variant="outline-light"
          size="sm"
          onClick={handleLogout}
          style={{
            borderRadius: '20px',
            padding: '4px 16px',
            fontSize: '0.8rem',
            fontWeight: '500',
          }}
        >
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
