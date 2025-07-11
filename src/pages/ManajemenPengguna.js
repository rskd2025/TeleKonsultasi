// ...import tetap
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AksesModal from './AksesModal';
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Table,
  Spinner,
  OverlayTrigger,
  Tooltip,
  Pagination,
} from 'react-bootstrap';
import api from '../api';
import { FaCog, FaSync } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../components/LoadingContext';

const ManajemenPengguna = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [cari, setCari] = useState('');
  const [pengguna, setPengguna] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAksesModal, setShowAksesModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPengguna();
  }, []);

  const fetchPengguna = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/pengguna');
      setPengguna(res.data);
    } catch (err) {
      toast.error('❌ Gagal mengambil data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleKembali = () => navigate(-1);
  const handleAkses = (user) => {
    setSelectedUser(user);
    setShowAksesModal(true);
  };

  const filteredPengguna = pengguna.filter((p) =>
    (p.nama_lengkap || '').toLowerCase().includes(cari.toLowerCase()) ||
    (p.nip || '').includes(cari)
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPengguna.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPengguna.length / itemsPerPage);

  return (
    <Container
      fluid
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        padding: '1rem',
        fontSize: '0.85rem',
        overflowY: 'auto',
      }}
    >
      <ToastContainer position="top-center" />

      <Card className="shadow-lg border-0" style={{ borderRadius: '1rem', background: '#fff' }}>
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col xs="auto">
              <Button variant="secondary" size="sm" onClick={handleKembali}>
                ← Kembali
              </Button>
            </Col>
            <Col className="d-flex flex-wrap justify-content-end gap-2">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Cari Nama / NIP"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                style={{ maxWidth: '240px' }}
              />
              <Button variant="outline-primary" size="sm" onClick={fetchPengguna}>
                <FaSync className="me-1" />
                Refresh
              </Button>
            </Col>
          </Row>

          <h5 className="mb-3 text-center text-md-start">Manajemen Pengguna</h5>

          <div className="table-responsive">
            <Table bordered hover size="sm" className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>NIP</th>
                  <th>Nama Lengkap</th>
                  <th>Tempat / Tgl. Lahir</th>
                  <th>Jenis Kelamin</th>
                  <th>Alamat</th>
                  <th>Profesi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((p, i) => (
                  <tr key={p.id}>
                    <td>{indexOfFirst + i + 1}</td>
                    <td>{p.nip}</td>
                    <td>{p.nama_lengkap || '-'}</td>
                    <td>
                      {p.tempat_lahir},{' '}
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{p.tanggal_lahir}</Tooltip>}
                      >
                        <span>
                          {p.tanggal_lahir
                            ? new Date(p.tanggal_lahir).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })
                            : '-'}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>{p.jenis_kelamin || '-'}</td>
                    <td>{p.alamat_lengkap || '-'}</td>
                    <td>{p.jenis_profesi || '-'}</td>
                    <td>
                      <FaCog
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                        title="Atur Hak Akses"
                        onClick={() => handleAkses(p)}
                      />
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="8">Tidak ada data pengguna.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              {[...Array(totalPages).keys()].map((num) => (
                <Pagination.Item
                  key={num + 1}
                  active={num + 1 === currentPage}
                  onClick={() => setCurrentPage(num + 1)}
                >
                  {num + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Card.Body>
      </Card>

      <AksesModal
        isOpen={showAksesModal}
        onClose={() => setShowAksesModal(false)}
        user={selectedUser}
        onSuccess={fetchPengguna}
      />
    </Container>
  );
};

export default ManajemenPengguna;
