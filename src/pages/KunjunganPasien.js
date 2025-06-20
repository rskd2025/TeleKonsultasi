// src/pages/KunjunganPasien.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Modal,
  Badge,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../components/LoadingContext';
import api from '../api';

const KunjunganPasien = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading(); // loading global
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role?.toLowerCase();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPasien, setSelectedPasien] = useState(null);
  const [jawabanKonsul, setJawabanKonsul] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/pemeriksaan/kunjungan?role=${role}`);
      const hasil = Array.isArray(res.data) ? res.data : [];
      setData(hasil);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Gagal fetch data:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [role, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filtered = (Array.isArray(data) ? data : []).filter((item) =>
      (item.nama_lengkap || '').toLowerCase().includes((search || '').toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, data]);

  const handleTerima = (pasien) => {
    setSelectedPasien(pasien);
    setJawabanKonsul('');
    setShowModal(true);
  };

  const handleBatal = async (pasien) => {
    if (window.confirm('Yakin batal menerima pasien ini?')) {
      try {
        await api.put(`/api/pemeriksaan/${pasien.id}/status`, { status: 'batal' });
        fetchData();
      } catch (err) {
        console.error('Gagal membatalkan:', err);
      }
    }
  };

  const simpanKonsul = async () => {
    try {
      await api.put(`/api/pemeriksaan/${selectedPasien.id}/terima`, {
        jawaban_konsul: jawabanKonsul,
      });
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error('Gagal menyimpan konsul:', err);
    }
  };

  return (
    <Container fluid className="mt-4 mb-4" style={{ fontSize: '0.9rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="text-white px-3 py-2 rounded" style={{ backgroundColor: '#884EA0' }}>
          📝 Kunjungan Pasien Hari Ini
        </h5>
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          ⬅ Kembali
        </Button>
      </div>

      <Form className="mb-3">
        <Row>
          <Col xs={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Cari nama pasien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="sm"
            />
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center text-muted">
          <Spinner animation="border" size="sm" />
          <div className="mt-2">Memuat data pasien...</div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center text-muted">Tidak ada data ditemukan</div>
      ) : (
        filteredData.map((item) => (
          <Card key={item.id} className="mb-3 shadow-sm">
            <Card.Body style={{ fontSize: '0.85rem', overflowX: 'auto', minWidth: '280px' }}>
              <Card.Title className="fw-bold">
                {(item.nama_lengkap || '').toUpperCase()} - {item.jenis_kelamin}, {item.umur} th
              </Card.Title>
              <Card.Text>
                <strong>Faskes Asal:</strong> {item.faskes_asal} <br />
                <strong>Tujuan Konsul:</strong> {item.tujuan_konsul} <br />
                <strong>Tanggal:</strong> {item.tanggal} <br />
                <strong>Status:</strong>{' '}
                <Badge bg="success">Pasien berada di ruangan / Sedang dilayani</Badge>
              </Card.Text>
              <div className="d-flex gap-2 flex-wrap">
                <Button variant="success" size="sm" onClick={() => handleTerima(item)}>
                  Terima
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleBatal(item)}>
                  Batal
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Modal Jawaban Konsul */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form Jawaban Konsul</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPasien && (
            <>
              <p><strong>Nama:</strong> {selectedPasien.nama_lengkap}</p>
              <p><strong>Umur:</strong> {selectedPasien.umur}</p>
              <p><strong>Diagnosa:</strong> {selectedPasien.diagnosa}</p>
              <p><strong>Anamnesis:</strong> {selectedPasien.anamnesis}</p>
              <Form.Group className="mt-3">
                <Form.Label>Jawaban Konsul</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={jawabanKonsul}
                  onChange={(e) => setJawabanKonsul(e.target.value)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={simpanKonsul}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default KunjunganPasien;
