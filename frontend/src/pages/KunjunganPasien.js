// src/pages/KunjunganPasien.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Badge,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const KunjunganPasien = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPasien, setSelectedPasien] = useState(null);
  const [jawabanKonsul, setJawabanKonsul] = useState('');
  const navigate = useNavigate();

  const fetchKunjungan = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/pemeriksaan/kunjungan');
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error('❌ Gagal mengambil data kunjungan:', err);
      toast.error('❌ Gagal mengambil data kunjungan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKunjungan();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.nama_lengkap.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, data]);

  const handleTerima = (pasien) => {
    setSelectedPasien(pasien);
    setJawabanKonsul('');
    setShowModal(true);
  };

  const simpanKonsul = async () => {
    if (!jawabanKonsul) {
      toast.warning('Mohon isi jawaban konsul.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/pemeriksaan/${selectedPasien.id}/terima`, {
        jawaban_konsul: jawabanKonsul,
      });
      toast.success('✅ Pasien diterima.');
      setShowModal(false);
      fetchKunjungan();
    } catch (err) {
      console.error('❌ Gagal menerima pasien:', err);
      toast.error('❌ Gagal memproses pasien');
    }
  };

  const handleBatal = async (kunjungan) => {
    try {
      await axios.put(`http://localhost:5000/api/pemeriksaan/${kunjungan.id}/status`, {
        status: 'batal',
      });
      toast.info(`🚫 Kunjungan ${kunjungan.nama_lengkap} dibatalkan.`);
      await fetchKunjungan();
    } catch (err) {
      console.error('❌ Gagal membatalkan:', err);
      toast.error('❌ Gagal membatalkan kunjungan');
    }
  };

  return (
    <Container className="mt-4" style={{ fontSize: '0.9rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white px-3 py-2 rounded" style={{ backgroundColor: '#884EA0' }}>
          📝 Kunjungan Pasien Hari Ini
        </h5>
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          ⬅ Kembali
        </Button>
      </div>

      <Form className="mb-3">
        <Row>
          <Col md={6}>
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
        <div className="text-center">
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        filteredData.map((item) => (
          <Card key={item.id} className="mb-3 shadow-sm">
            <Card.Body style={{ fontSize: '0.85rem' }}>
              <Card.Title className="fw-bold">
                {item.nama_lengkap.toUpperCase()} - {item.jenis_kelamin}, {item.umur} th
              </Card.Title>
              <Card.Text>
                <strong>Faskes Asal:</strong> {item.faskes_asal} <br />
                <strong>Tujuan Konsul:</strong> {item.tujuan_konsul} <br />
                <strong>Tanggal:</strong> {item.tanggal} <br />
                <strong>Status:</strong>{' '}
                <Badge bg="success">Pasien berada di ruangan / Sedang dilayani</Badge>
              </Card.Text>
              <div className="d-flex gap-2">
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
