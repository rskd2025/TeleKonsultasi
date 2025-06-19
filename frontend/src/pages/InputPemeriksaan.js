import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const InputPemeriksaan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pasienId = queryParams.get('id');

  const [pasien, setPasien] = useState(null);
  const [form, setForm] = useState({
    faskes_asal: '',
    tujuan_konsul: '',
    anamnesis: '',
    diagnosa: '',
    tanggal: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (!pasienId) return;

    const fetchPasien = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pasien/${pasienId}`);
        setPasien(res.data);
      } catch (err) {
        console.error('❌ Gagal mengambil data pasien:', err);
        toast.error('❌ Data pasien tidak ditemukan');
        navigate('/daftar-pasien');
      }
    };

    fetchPasien();
  }, [pasienId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/pemeriksaan', {
        ...form,
        pasien_id: pasienId,
      });
      toast.success('✅ Pemeriksaan berhasil disimpan');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Gagal menyimpan pemeriksaan:', err);
      toast.error('❌ Gagal menyimpan pemeriksaan');
    }
  };

  if (!pasien) return <div className="p-4">🔄 Memuat data pasien...</div>;

  const umur = new Date().getFullYear() - new Date(pasien.tanggal_lahir).getFullYear();
  const tanggalLahir = new Date(pasien.tanggal_lahir).toLocaleDateString('id-ID');

  return (
    <Container
      className="mt-4 p-4 rounded"
      style={{
        background: 'linear-gradient(to right, #D2B4DE, #E8DAEF)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h4 className="mb-4 text-center" style={{ color: '#5B2C6F' }}>
        📝 Form Pemeriksaan Pasien
      </h4>

      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="small">
          <h6 className="text-muted mb-3">🧾 Data Pasien</h6>
          <Row>
            <Col md={6}>
              <strong>Nama:</strong> {pasien.nama_lengkap} <br />
              <strong>No RM:</strong> {pasien.no_rm}
            </Col>
            <Col md={6}>
              <strong>Jenis Kelamin:</strong> {pasien.jenis_kelamin} <br />
              <strong>Tanggal Lahir:</strong> {tanggalLahir} <br />
              <strong>Umur:</strong> {umur} tahun
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Faskes Asal</Form.Label>
              <Form.Control
                name="faskes_asal"
                value={form.faskes_asal}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tujuan Konsul</Form.Label>
              <Form.Select
                name="tujuan_konsul"
                value={form.tujuan_konsul}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Tujuan --</option>
                <option value="Psikolog">Psikolog</option>
                <option value="Psikiater">Psikiater</option>
                <option value="Perawat Jiwa">Perawat Jiwa</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Anamnesis</Form.Label>
              <Form.Control
                name="anamnesis"
                as="textarea"
                rows={2}
                value={form.anamnesis}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Diagnosa</Form.Label>
              <Form.Control
                name="diagnosa"
                as="textarea"
                rows={2}
                value={form.diagnosa}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tanggal Pemeriksaan</Form.Label>
              <Form.Control
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end mt-4">
              <Button type="submit" variant="success">
                💾 Simpan
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
                ❌ Batal
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InputPemeriksaan;
