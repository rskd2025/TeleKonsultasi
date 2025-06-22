import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../api';
import { useLoading } from './LoadingContext';

const PasswordModal = ({
  show,
  handleClose,
  penggunaId = null,
  namaLengkap = 'Pengguna',
  defaultUsername = '',
  defaultRole = 'petugas input',
  onSubmit,
}) => {
  const { setLoading } = useLoading();

  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(defaultRole);

  useEffect(() => {
    if (show) {
      setUsername(defaultUsername || '');
      setRole(defaultRole || 'petugas input');
      setPassword('');
      setConfirmPassword('');
    }
  }, [show, defaultUsername, defaultRole]);

  const handleSubmit = async () => {
    if (!penggunaId) return toast.error('❌ ID pengguna tidak tersedia');

    if (!username.trim()) return toast.error('❌ Username wajib diisi');
    if (!password || !confirmPassword) return toast.error('❌ Password wajib diisi');
    if (password.length < 6) return toast.error('❌ Password minimal 6 karakter');
    if (password !== confirmPassword) return toast.error('❌ Password tidak sama');
    if (!role) return toast.error('❌ Role wajib dipilih');

    try {
      setLoading(true);
      await onSubmit(username.trim(), password, role);
    } catch (err) {
      toast.error('❌ Gagal menyimpan password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered scrollable size="md">
      <Modal.Header closeButton style={{ backgroundColor: '#2196f3', color: 'white' }}>
        <Modal.Title style={{ fontSize: '1rem' }}>
          🔒 Atur Password - {namaLengkap}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '0.9rem' }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Input Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ulangi Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ulangi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              size="sm"
            >
              <option value="">Pilih Role</option>
              <option value="Administrator">Administrator</option>
              <option value="Dokter">Dokter</option>
              <option value="Psikolog">Psikolog</option>
              <option value="Perawat">Perawat</option>
              <option value="Petugas Input">Petugas Input</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="primary" onClick={handleSubmit}>
          Simpan
        </Button>
        <Button size="sm" variant="secondary" onClick={handleClose}>
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordModal;
