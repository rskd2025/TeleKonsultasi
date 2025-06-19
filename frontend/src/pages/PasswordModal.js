import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const PasswordModal = ({ show, handleClose, namaLengkap = 'Pengguna', penggunaId = null }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setRole('');
      setLoading(false);
    }
  }, [show]);

  const handleSubmit = async () => {
    if (!penggunaId) {
      toast.error('❌ ID pengguna tidak ditemukan');
      return;
    }

    if (!username.trim()) {
      toast.error('❌ Username tidak boleh kosong');
      return;
    }

    if (!password || !confirmPassword) {
      toast.error('❌ Password tidak boleh kosong');
      return;
    }

    if (password.length < 6) {
      toast.error('❌ Password minimal 6 karakter');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('❌ Password tidak sama');
      return;
    }

    if (!role) {
      toast.error('❌ Role belum dipilih');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/pengguna/${penggunaId}/password`, {
        username: username.trim(),
        password,
        role,
      });

      toast.success('✅ Password berhasil disimpan');
      handleClose();
    } catch (error) {
      console.error('Gagal menyimpan password:', error);
      toast.error(error.response?.data?.error || '❌ Gagal menyimpan password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#2196f3', color: 'white' }}>
        <Modal.Title style={{ fontSize: '1rem' }}>
          🔒 Atur Password - {namaLengkap}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '0.9rem' }}>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Input Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Ulangi Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ulangi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="">Pilih Role</option>
              <option value="Administrator">Administrator</option>
              <option value="Dokter">Dokter</option>
              <option value="Perawat">Perawat</option>
              <option value="Petugas Input">Petugas Input</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
        <Button size="sm" variant="secondary" onClick={handleClose} disabled={loading}>
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordModal;