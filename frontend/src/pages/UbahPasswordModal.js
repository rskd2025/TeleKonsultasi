import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UbahPasswordModal = ({ show, onHide }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  }, [show]);

  const handleSave = async () => {
    if (!password || !confirmPassword) {
      setMessage('Semua kolom harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Password dan konfirmasi tidak cocok');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/users/password/${user.id}`, {
        password,
      });
      setMessage('Password berhasil diubah');
      setLoading(false);
    } catch (error) {
      setMessage('Gagal mengubah password');
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ubah Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={user?.username || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password Baru</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konfirmasi Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {message && <div className="text-danger">{message}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Kembali
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UbahPasswordModal;
