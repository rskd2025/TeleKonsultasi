import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Card,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

let timer;

const PendaftaranPasien = () => {
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
    if (!data.nama_lengkap || !data.nik || !data.tanggal_lahir || !data.jenis_kelamin) {
      toast.error('❌ Mohon lengkapi data wajib: Nama, NIK, Tanggal Lahir, dan Jenis Kelamin');
      return;
    }

    try {
      const res = await api.post('/api/pasien', data);
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
      console.error('❌ Gagal menyimpan data pasien:', err.response?.data || err);
      toast.error('❌ Gagal menyimpan data pasien');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleCari = async (query) => {
    if (!query.trim()) return setHasilCari([]);
    try {
      const res = await api.get(`/api/pasien/cari?query=${encodeURIComponent(query)}`);
      setHasilCari(res.data);
    } catch (err) {
      console.error('❌ Error saat cari pasien:', err.response?.data || err);
      setHasilCari([]);
    }
  };

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleCari(cari);
    }, 500);
    return () => clearTimeout(timer);
  }, [cari]);

  return (
    <Container className="mt-4 mb-4" fluid>
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Card className="p-3 shadow-sm">
            <h5>📝 Form Pendaftaran Pasien</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Nama Lengkap *</Form.Label>
                <Form.Control
                  type="text"
                  name="nama_lengkap"
                  value={data.nama_lengkap}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>NIK *</Form.Label>
                <Form.Control
                  type="text"
                  name="nik"
                  value={data.nik}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Hanya izinkan angka
                    if (/^\d*$/.test(newValue)) {
                      handleChange(e);
                    }
                  }}
                  maxLength={16}
                  required
                  isInvalid={data.nik.length > 0 && data.nik.length < 16}
                  />
              <Form.Control.Feedback type="invalid">
                NIK belum lengkap (harus 16 digit)
              </Form.Control.Feedback>

              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Tanggal Lahir *</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal_lahir"
                  value={data.tanggal_lahir}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Jenis Kelamin *</Form.Label>
                <Form.Select
                  name="jenis_kelamin"
                  value={data.jenis_kelamin}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih...</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="textarea"
                  name="alamat"
                  rows={2}
                  value={data.alamat}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>No HP Pasien</Form.Label>
                <Form.Control
                  type="text"
                  name="no_hp_pasien"
                  value={data.no_hp_pasien}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>No HP Pengantar</Form.Label>
                <Form.Control
                  type="text"
                  name="no_hp_pengantar"
                  value={data.no_hp_pengantar}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleCancel}>
                  Batal
                </Button>
                <Button variant="primary" type="submit" className="w-100 ms-2">
                  Simpan & Lanjut
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="p-3 shadow-sm">
            <h5>🔍 Cari Pasien</h5>
            <Form.Group className="mb-2 d-flex">
              <Form.Control
                type="text"
                placeholder="Masukkan nama / No. RM"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCari(cari);
                  }
                }}
              />
              <Button onClick={() => handleCari(cari)} className="ms-2">
                Cari
              </Button>
            </Form.Group>

            <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <Table responsive striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>No. RM</th>
                    <th>Nama</th>
                    <th>NIK</th>
                    <th>Lahir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {hasilCari.length > 0 ? (
                    hasilCari.map((item) => (
                      <tr key={item.id}>
                        <td>{item.no_rm}</td>
                        <td>{item.nama_lengkap}</td>
                        <td>{item.nik}</td>
                        <td>{item.tanggal_lahir}</td>
                        <td>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => navigate(`/input-pemeriksaan?id=${item.id}`)}
                          >
                            Pilih
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Belum ada hasil pencarian
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PendaftaranPasien;
