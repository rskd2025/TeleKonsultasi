import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import api from '../api';

const SignupModal = ({ show, onHide }) => {
  const [form, setForm] = useState({
    nama_lengkap: '',
    nip: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    agama: '',
    username: '',
    password: '',
    konfirmasi_password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({
      nama_lengkap: '',
      nip: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      agama: '',
      username: '',
      password: '',
      konfirmasi_password: '',
    });
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    if (form.password !== form.konfirmasi_password) {
      setErrorMessage('Konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/pengguna', {
        nama_lengkap: form.nama_lengkap,
        nip: form.nip,
        tempat_lahir: form.tempat_lahir,
        tanggal_lahir: form.tanggal_lahir,
        jenis_kelamin: form.jenis_kelamin,
        agama: form.agama,
        username: form.username,
        jenis_pengguna: 'Eksternal',
      });

      await api.post('/api/users', {
        username: form.username,
        password: form.password,
        role: 'petugas input',
      });

      setSuccessMessage('✅ Data anda berhasil tersimpan. Silakan login.');

      setTimeout(() => {
        resetForm();
        onHide();
      }, 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message || '❌ Terjadi kesalahan saat menyimpan data.';
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>📝 Signup Pengguna Baru</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              name="nama_lengkap"
              value={form.nama_lengkap}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>NIP</Form.Label>
            <Form.Control
              name="nip"
              value={form.nip}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Tempat Lahir</Form.Label>
                <Form.Control
                  name="tempat_lahir"
                  value={form.tempat_lahir}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal_lahir"
                  value={form.tanggal_lahir}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-2">
            <Form.Label>Jenis Kelamin</Form.Label>
            <Form.Select
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih --</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Agama</Form.Label>
            <Form.Control
              name="agama"
              value={form.agama}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control
                  type="password"
                  name="konfirmasi_password"
                  value={form.konfirmasi_password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3 gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
