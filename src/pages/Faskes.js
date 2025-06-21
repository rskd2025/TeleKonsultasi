import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
  Card,
  Alert,
} from 'react-bootstrap';
import api from 'api';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../components/LoadingContext';

const Faskes = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [faskes, setFaskes] = useState([]);
  const [filteredFaskes, setFilteredFaskes] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    jenis: '',
    kabupaten: '',
    provinsi: '',
    id: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchFaskes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/faskes');
      console.log('📡 Data faskes dari backend:', res.data);
      setFaskes(res.data);
      setFilteredFaskes(res.data);
    } catch (err) {
      console.error('Gagal mengambil data faskes:', err);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchFaskes();
  }, [fetchFaskes]);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = faskes.filter((item) => {
      const nama = item.nama || '';
      const kode = item.kode || '';
      const kabupaten = item.kabupaten || '';
      return (
        nama.toLowerCase().includes(lower) ||
        kode.toLowerCase().includes(lower) ||
        kabupaten.toLowerCase().includes(lower)
      );
    });
    setFilteredFaskes(filtered);
  }, [search, faskes]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    setShowModal(true);
  };

  const handleHapus = async (id) => {
    if (!window.confirm('Yakin hapus data ini?')) return;
    setLoading(true);
    try {
      await api.delete(`/api/faskes/${id}`);
      fetchFaskes();
    } catch (err) {
      console.error('Gagal menghapus faskes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimpan = async () => {
    setLoading(true);
    try {
      if (editMode) {
        await api.put(`/api/faskes/${formData.id}`, formData);
      } else {
        await api.post('/api/faskes', formData);
      }
      setShowSuccess(true);
      fetchFaskes();
      setTimeout(() => {
        setShowModal(false);
        setShowSuccess(false);
        setEditMode(false);
      }, 1000);
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="mt-4 mb-4">
      <Card className="shadow">
        <Card.Header style={{ background: 'linear-gradient(to right, #7b2ff7, #f107a3)', color: 'white' }}>
          <Row className="align-items-center g-2">
            <Col xs={12} md="auto" className="d-flex gap-2 flex-wrap">
              <Button size="sm" variant="light" onClick={() => navigate(-1)}>
                ←
              </Button>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Cari Faskes / Kabupaten / Kode"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: '0.75rem', minWidth: '200px' }}
              />
              <Button
                size="sm"
                variant="light"
                onClick={() => {
                  setFormData({ nama: '', kode: '', jenis: '', kabupaten: '', provinsi: '', id: '' });
                  setEditMode(false);
                  setShowModal(true);
                }}
              >
                +
              </Button>
              <Button size="sm" variant="outline-light" onClick={fetchFaskes}>
                ↻
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <div style={{ overflowX: 'auto' }}>
            <Table hover bordered size="sm" className="text-center align-middle" responsive>
              <thead style={{ backgroundColor: '#f3f0ff', fontSize: '0.8rem' }}>
                <tr>
                  <th>No</th>
                  <th>Nama Faskes</th>
                  <th>Kode Faskes</th>
                  <th>Jenis</th>
                  <th>Kabupaten</th>
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
                        <Button size="sm" variant="outline-primary" onClick={() => handleEdit(item)}>
                          ✏️
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleHapus(item.id)}>
                          🗑️
                        </Button>
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
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => { setShowModal(false); setEditMode(false); }} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1rem' }}>
            {editMode ? 'Edit Faskes' : 'Tambah Faskes'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '0.85rem' }}>
          {showSuccess && (
            <Alert variant="success" className="text-center py-2">
              ✅ Data berhasil disimpan.
            </Alert>
          )}
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Nama Faskes</Form.Label>
                  <Form.Control
                    size="sm"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Kode Faskes</Form.Label>
                  <Form.Control
                    size="sm"
                    name="kode"
                    value={formData.kode}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Jenis Faskes</Form.Label>
                  <Form.Control
                    size="sm"
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Kabupaten/Kota</Form.Label>
                  <Form.Control
                    size="sm"
                    name="kabupaten"
                    value={formData.kabupaten}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Provinsi</Form.Label>
                  <Form.Control
                    size="sm"
                    name="provinsi"
                    value={formData.provinsi}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    size="sm"
                    name="id"
                    value={formData.id}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button size="sm" variant="primary" onClick={handleSimpan}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Faskes;
