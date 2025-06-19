import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Alert,
} from 'react-bootstrap';

const Faskes = () => {
  const navigate = useNavigate();
  const [dataFaskes, setDataFaskes] = useState([]);
  const [filteredFaskes, setFilteredFaskes] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    jenis: '',
    kabupaten: '',
    provinsi: '',
    id: '',
  });

  useEffect(() => {
    fetchFaskes();
  }, []);

  useEffect(() => {
    const filtered = dataFaskes.filter((item) => {
      return (
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.jenis.toLowerCase().includes(search.toLowerCase()) ||
        item.kabupaten.toLowerCase().includes(search.toLowerCase()) ||
        item.kode.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredFaskes(filtered);
  }, [search, dataFaskes]);

  const fetchFaskes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faskes');
      setDataFaskes(res.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpan = async () => {
    const { nama, kode, jenis, kabupaten, provinsi, id } = formData;
    if (!nama || !kode || !jenis || !kabupaten || !provinsi) {
      alert('Harap lengkapi semua data.');
      return;
    }

    try {
      if (editMode) {
        await axios.put(`/api/faskes/${id}`, formData);
      } else {
        await axios.post('/api/faskes', formData);
      }
      fetchFaskes();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
        setFormData({
          nama: '', kode: '', jenis: '', kabupaten: '', provinsi: '', id: ''
        });
        setEditMode(false);
      }, 1200);
    } catch (err) {
      console.error('Gagal menyimpan:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    setShowModal(true);
  };

  const handleHapus = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`/api/faskes/${id}`);
        fetchFaskes();
      } catch (err) {
        console.error('Gagal menghapus:', err);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Header style={{ background: 'linear-gradient(to right, #7b2ff7, #f107a3)', color: 'white' }}>
          <Row className="align-items-center">
            <Col className="d-flex gap-2 align-items-center">
              <Button
                size="sm"
                variant="light"
                style={{ height: '30px', fontSize: '0.75rem' }}
                onClick={() => navigate(-1)}
              >
                ←
              </Button>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Cari Faskes / Kabupaten / Kode"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: '0.75rem', height: '30px', minWidth: '200px' }}
              />
              <Button
                size="sm"
                style={{ height: '30px', fontSize: '0.75rem' }}
                variant="light"
                onClick={() => {
                  setFormData({ nama: '', kode: '', jenis: '', kabupaten: '', provinsi: '', id: '' });
                  setEditMode(false);
                  setShowModal(true);
                }}
              >
                +
              </Button>
              <Button
                size="sm"
                style={{ height: '30px', fontSize: '0.75rem' }}
                variant="outline-light"
                onClick={fetchFaskes}
              >
                ↻
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Table hover bordered size="sm" className="text-center align-middle">
            <thead style={{ backgroundColor: '#f3f0ff', fontSize: '0.8rem' }}>
              <tr>
                <th>No</th>
                <th>Nama Faskes</th>
                <th>Kode Faskes</th>
                <th>Jenis Faskes</th>
                <th>Kabupaten/Kota</th>
                <th>Provinsi</th>
                <th>ID</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.8rem' }}>
              {filteredFaskes.length ? (
                filteredFaskes.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.kode}</td>
                    <td>{item.jenis}</td>
                    <td>{item.kabupaten}</td>
                    <td>{item.provinsi}</td>
                    <td>{item.id}</td>
                    <td className="d-flex justify-content-center gap-1">
                      <Button size="sm" variant="outline-primary" onClick={() => handleEdit(item)}>✏️</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleHapus(item.id)}>🗑️</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Tidak ada data ditemukan.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => { setShowModal(false); setEditMode(false); }} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1rem' }}>{editMode ? 'Edit Faskes' : 'Tambah Faskes'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '0.85rem' }}>
          {showSuccess && (
            <Alert variant="success" className="text-center py-2">
              ✅ Data berhasil disimpan.
            </Alert>
          )}
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Nama Faskes</Form.Label>
                  <Form.Control size="sm" name="nama" value={formData.nama} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Kode Faskes</Form.Label>
                  <Form.Control size="sm" name="kode" value={formData.kode} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Jenis Faskes</Form.Label>
                  <Form.Control size="sm" name="jenis" value={formData.jenis} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Kabupaten/Kota</Form.Label>
                  <Form.Control size="sm" name="kabupaten" value={formData.kabupaten} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Provinsi</Form.Label>
                  <Form.Control size="sm" name="provinsi" value={formData.provinsi} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>ID</Form.Label>
                  <Form.Control size="sm" name="id" value={formData.id} disabled />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" style={{ minWidth: '80px' }} onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button size="sm" variant="primary" style={{ minWidth: '80px' }} onClick={handleSimpan}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Faskes;
