import React, { useState } from 'react';
import { Button, Form, Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from 'api';
import { toast } from 'react-toastify';

const UbahPassword = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [lama, setLama] = useState('');
  const [baru, setBaru] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lama || !baru || !konfirmasi) {
      toast.warn('⚠️ Semua kolom harus diisi');
      return;
    }

    if (baru.length < 6) {
      toast.warn('❌ Password baru minimal 6 karakter');
      return;
    }

    if (baru !== konfirmasi) {
      toast.error('❌ Konfirmasi password tidak cocok');
      return;
    }

    try {
      setLoading(true);
      await api.put(`/api/users/password/${user.id}`, {
        oldPassword: lama,
        newPassword: baru,
      });

      toast.success('✅ Password berhasil diubah');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || '❌ Gagal mengubah password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-4"
      style={{ minHeight: '100vh', overflowY: 'auto' }}
    >
      <Card style={{ width: '100%', maxWidth: '420px' }} className="p-2 shadow-sm">
        <Card.Body>
          <h5 className="text-center mb-4">Ubah Password</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPasswordLama">
              <Form.Label>Password Lama</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                placeholder="Masukkan password lama"
                value={lama}
                onChange={(e) => setLama(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPasswordBaru">
              <Form.Label>Password Baru</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                placeholder="Masukkan password baru"
                value={baru}
                onChange={(e) => setBaru(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formVerifikasiPasswordBaru">
              <Form.Label>Verifikasi Password Baru</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                placeholder="Verifikasi password baru"
                value={konfirmasi}
                onChange={(e) => setKonfirmasi(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <div className="d-grid gap-2 mb-2">
              <Button variant="primary" type="submit" size="sm" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-1" />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan'
                )}
              </Button>
              <Button
                variant="secondary"
                type="button"
                size="sm"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                variant="success"
                type="button"
                size="sm"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
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
