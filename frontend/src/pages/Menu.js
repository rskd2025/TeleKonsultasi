import React from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Pengguna', path: '/pengguna', variant: 'light' },
    { label: 'Manajemen Pengguna', path: '/manajemen-pengguna', variant: 'light' },
    { label: 'Faskes', path: '/faskes', variant: 'light' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        overflowY: 'auto', // ✅ agar bisa scroll di layar kecil
      }}
    >
      <Container fluid>
        <Card
          className="mx-auto shadow-lg"
          style={{
            width: '100%',
            maxWidth: '480px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Card.Body className="p-4">
            <h4 className="text-center mb-4 fw-bold text-dark">Menu Pengaturan</h4>

            <div className="d-flex flex-column gap-3">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.variant}
                  size="lg"
                  className="fw-semibold text-dark border"
                  onClick={() => navigate(item.path)}
                  style={{
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fa',
                    width: '100%',
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Button
                variant="outline-dark"
                size="lg"
                onClick={() => navigate(-1)}
                style={{ borderRadius: '12px', width: '100%' }}
              >
                Kembali
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Menu;
