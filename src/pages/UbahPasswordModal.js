import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Container } from 'react-bootstrap';
import api from 'api';
import { useLoading } from '../components/LoadingContext';

const UbahPasswordModal = ({ show, onHide }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  const timer = setTimeout(() => setLoading(false), 500); // atau setelah fetch data
    if (show) {
      setPassword('');
      setConfirmPassword('');
      setMessage('');
    }
  }, [show]);

  const handleSave = async () => {
    if (!password || !confirmPassword) {
      setMessage('⚠️ Semua kolom harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('❌ Password dan konfirmasi tidak cocok');
      return;
    }

    try {
      setLoading(true);
      await api.put(`/api/users/password/${user.id}`, { password });
      setMessage('✅ Password berhasil diubah');
    } catch (error) {
      console.error(error);
      setMessage('❌ Gagal mengubah password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      scrollable
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '1rem' }}>Ubah Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container fluid>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={user?.username || ''}
                readOnly
                size="sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password Baru</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="sm"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Konfirmasi Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="sm"
                disabled={loading}
              />
            </Form.Group>

            {message && (
              <div
                className="text-center"
                style={{
                  color: message.includes('berhasil') ? 'green' : 'red',
                  fontSize: '0.85rem',
                }}
              >
                {message}
              </div>
            )}
          </Form>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onHide} disabled={loading}>
          Kembali
        </Button>
        <Button variant="primary" size="sm" onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Menyimpan...
            </>
          ) : (
            'Simpan'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UbahPasswordModal;
