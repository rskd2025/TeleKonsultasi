import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Table, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DaftarPasien = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama_lengkap: '',
    nik: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    no_hp_pasien: '',
    no_hp_pengantar: '',
  });

  const [cari, setCari] = useState('');
  const [hasilCari, setHasilCari] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/pasien', data);
      toast.success('✅ Pasien berhasil didaftarkan');
      const pasienId = res.data.id;

      setData({
        nama_lengkap: '',
        nik: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat: '',
        no_hp_pasien: '',
        no_hp_pengantar: '',
      });

      navigate(`/input-pemeriksaan?id=${pasienId}`);
    } catch (err) {
      console.error('❌ Gagal menyimpan data pasien:', err);
      toast.error('❌ Gagal menyimpan data pasien');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleCari = async () => {
    if (!cari.trim()) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/pasien/cari?query=${cari}`);
      setHasilCari(res.data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Gagal mencari data pasien');
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg border-0">
        <Card.Header
          style={{
            background: 'linear-gradient(to right, #7b2ff7, #f107a3)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
          }}
        >
          <h5 className="mb-0">📝 Daftar Pasien Baru</h5>
        </Card.Header>
        <Card.Body style={{ backgroundColor: '#f8f6fc' }}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Cari Pasien (Nama atau No RM)</Form.Label>
            <Row>
              <Col md={10}>
                <Form.Control
                  type="text"
                  placeholder="Contoh: Aminah atau RM1023"
                  value={cari}
                  onChange={(e) => setCari(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button variant="info" onClick={handleCari} className="w-100">
                  Cari
                </Button>
              </Col>
            </Row>
          </Form.Group>

          {hasilCari.length > 0 && (
            <>
              <h6 className="fw-semibold">🔎 Hasil Pencarian:</h6>
              <Table bordered hover size="sm" className="bg-white">
                <thead className="text-center bg-light">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>No RM</th>
                    <th>JK</th>
                    <th>Tgl Lahir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {hasilCari.map((p, idx) => (
                    <tr key={p.id}>
                      <td>{idx + 1}</td>
                      <td>{p.nama_lengkap}</td>
                      <td>{p.no_rm}</td>
                      <td>{p.jenis_kelamin}</td>
                      <td>{p.tanggal_lahir}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => navigate(`/input-pemeriksaan?id=${p.id}`)}
                        >
                          Pemeriksaan
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          <hr />

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Nama Lengkap</Form.Label>
                  <Form.Control
                    name="nama_lengkap"
                    value={data.nama_lengkap}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Jenis Kelamin</Form.Label>
                  <Form.Select
                    name="jenis_kelamin"
                    value={data.jenis_kelamin}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih --</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Tanggal Lahir</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal_lahir"
                    value={data.tanggal_lahir}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">NIK</Form.Label>
              <Form.Control
                name="nik"
                value={data.nik}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Alamat</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="alamat"
                value={data.alamat}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">No HP</Form.Label>
              <Form.Control
                name="no_hp_pasien"
                value={data.no_hp_pasien}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">No HP Pengantar / yang bisa dihubungi</Form.Label>
              <Form.Control
                name="no_hp_pengantar"
                value={data.no_hp_pengantar}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-3">
              <Button type="submit" variant="success" className="px-4">
                ✅ Daftar
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                ❌ Batal
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DaftarPasien;
