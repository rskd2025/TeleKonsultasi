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
import api from 'api';
import { FaCog } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManajemenPengguna = () => {
  const navigate = useNavigate();
  const [cari, setCari] = useState('');
  const [pengguna, setPengguna] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const res = await api.get('/api/pengguna'); // ✅ gunakan path relatif
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
    (typeof p.nama_lengkap === 'string' && p.nama_lengkap.toLowerCase().includes(cari.toLowerCase())) ||
    (typeof p.nip === 'string' && p.nip.includes(cari))
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
        padding: '2rem',
        fontSize: '0.85rem',
      }}
    >
      <ToastContainer position="top-center" />
      <Card
        className="shadow-lg border-0"
        style={{ borderRadius: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
      >
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col md={4}>
              <Button variant="secondary" size="sm" onClick={handleKembali}>
                ← Kembali
              </Button>
            </Col>
            <Col md={8} className="d-flex justify-content-end">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Cari Nama / NIP"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                style={{ maxWidth: '240px' }}
              />
            </Col>
          </Row>

          <h5 className="mb-3">Manajemen Pengguna</h5>

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <div>Memuat data...</div>
            </div>
          ) : (
            <>
              <Table bordered hover responsive size="sm" className="align-middle text-center">
                <thead className="table-light">
                  <tr>
                    <th style={{ fontSize: '0.75rem' }}>No</th>
                    <th style={{ fontSize: '0.75rem' }}>NIP</th>
                    <th style={{ fontSize: '0.75rem' }}>Nama Lengkap</th>
                    <th style={{ fontSize: '0.75rem' }}>Tempat / Tgl. Lahir</th>
                    <th style={{ fontSize: '0.75rem' }}>Jenis Kelamin</th>
                    <th style={{ fontSize: '0.75rem' }}>Alamat</th>
                    <th style={{ fontSize: '0.75rem' }}>Profesi</th>
                    <th style={{ fontSize: '0.75rem' }}>Aksi</th>
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
                        <OverlayTrigger placement="top" overlay={<Tooltip>{p.tanggal_lahir}</Tooltip>}>
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
                      <td colSpan="8" className="text-center">
                        Tidak ada data pengguna.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

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
            </>
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
