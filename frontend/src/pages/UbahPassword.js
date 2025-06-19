import React from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UbahPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // logika ubah password di sini
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h4 className="text-center mb-4">Ubah Password</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPasswordLama">
              <Form.Label>Password Lama</Form.Label>
              <Form.Control type="password" size="sm" placeholder="Masukkan password lama" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPasswordBaru">
              <Form.Label>Password Baru</Form.Label>
              <Form.Control type="password" size="sm" placeholder="Masukkan password baru" required />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formVerifikasiPasswordBaru">
              <Form.Label>Verifikasi Password Baru</Form.Label>
              <Form.Control type="password" size="sm" placeholder="Verifikasi password baru" required />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" size="sm">
                Simpan
              </Button>
              <Button variant="secondary" type="button" size="sm" onClick={() => navigate('/dashboard')}>
                Batal
              </Button>
              <Button variant="success" type="button" size="sm" onClick={() => navigate(-1)}>
                Kembali
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UbahPassword;
