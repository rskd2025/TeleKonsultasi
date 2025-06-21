import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import api from '../api';
import { useLoading } from '../components/LoadingContext';

const InputPemeriksaan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useLoading();

  const [pasien, setPasien] = useState(location.state?.pasien || {});
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [umur, setUmur] = useState(0);
  const [daftarFaskes, setDaftarFaskes] = useState([]);

  const [form, setForm] = useState({
    faskes_asal: '',
    tujuan_konsul: '',
    anamnesis: '',
    diagnosa: '',
    tanggal: '',
  });

  useEffect(() => {
    const getPasienById = async (id) => {
      try {
        const res = await api.get(`/api/pasien/${id}`);
        setPasien(res.data);
        const tgl = new Date(res.data.tanggal_lahir);
        setTanggalLahir(tgl.toLocaleDateString('id-ID'));
        setUmur(new Date().getFullYear() - tgl.getFullYear());
      } catch (err) {
        console.error('❌ Gagal ambil data pasien:', err);
      }
    };

    const getFaskes = async () => {
      try {
        const res = await api.get('/api/faskes');
        console.log('📡 Data faskes dari backend:', res.data);
        const options = res.data.map((f) => ({
          value: f.nama_faskes,
          label: f.nama_faskes,
        }));
        setDaftarFaskes(options);
      } catch (err) {
        console.error('❌ Gagal ambil data faskes:', err);
      }
    };

    const init = () => {
      setLoading(true);
      getFaskes();

      if (!location.state?.pasien) {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');
        if (id) getPasienById(id);
      } else {
        const tgl = new Date(location.state.pasien.tanggal_lahir);
        setTanggalLahir(tgl.toLocaleDateString('id-ID'));
        setUmur(new Date().getFullYear() - tgl.getFullYear());
      }

      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    };

    init();
  }, [location.state, setLoading]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/pemeriksaan', {
        ...form,
        pasien_id: pasien.id,
      });
      alert('✅ Pemeriksaan berhasil disimpan.');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Gagal menyimpan:', err);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="mt-4 p-3 rounded" style={{ background: 'linear-gradient(to right, #D2B4DE, #E8DAEF)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h5 className="mb-4 text-center" style={{ color: '#5B2C6F' }}>📝 Form Pemeriksaan Pasien</h5>

      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="small">
          <h6 className="text-muted mb-3">🧾 Data Pasien</h6>
          <Row>
            <Col xs={12} md={6}>
              <strong>Nama:</strong> {pasien.nama_lengkap} <br />
              <strong>No RM:</strong> {pasien.no_rm}
            </Col>
            <Col xs={12} md={6}>
              <strong>Jenis Kelamin:</strong> {pasien.jenis_kelamin} <br />
              <strong>Tanggal Lahir:</strong> {tanggalLahir} <br />
              <strong>Umur:</strong> {umur} tahun
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body className="small">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Faskes Asal</Form.Label>
              <Select
                options={daftarFaskes}
                value={daftarFaskes.find((opt) => opt.value === form.faskes_asal) || null}
                onChange={(selected) =>
                  setForm({ ...form, faskes_asal: selected?.value || '' })
                }
                isClearable
                placeholder="Pilih atau ketik faskes..."
                noOptionsMessage={() => 'Faskes tidak ditemukan'}
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
              <Button type="submit" variant="success">💾 Simpan</Button>
              <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>❌ Batal</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InputPemeriksaan;
