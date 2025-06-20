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
import api from '../api'; // ✅ pastikan path sesuai struktur project
import { FaCog } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../components/LoadingContext';

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
    setLoading(true);
  const timer = setTimeout(() => setLoading(false), 500); // atau setelah fetch data

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
          <Row className="align-items-center mb-3 flex-column flex-md-row">
            <Col xs={12} md={4} className="mb-2 mb-md-0">
              <Button variant="secondary" size="sm" onClick={handleKembali} className="w-100 w-md-auto">
                ← Kembali
              </Button>
            </Col>
            <Col xs={12} md={8}>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Cari Nama / NIP"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                className="w-100"
              />
            </Col>
          </Row>

          <h5 className="mb-3 text-center text-md-start">Manajemen Pengguna</h5>

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <div>Memuat data...</div>
            </div>
          ) : (
            <>
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
