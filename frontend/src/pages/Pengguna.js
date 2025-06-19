// Tetap gunakan ini
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TambahPenggunaModal from './TambahPenggunaModal';
import PasswordModal from './PasswordModal';
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Table,
  Spinner,
  Modal,
  OverlayTrigger,
  Tooltip,
  Pagination,
  Badge,
} from 'react-bootstrap';
import api from 'api';
import { FaEdit, FaTrash, FaKey } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pengguna = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [cari, setCari] = useState('');
  const [pengguna, setPengguna] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showTambahPenggunaModal, setShowTambahPenggunaModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPengguna();
  }, []);

  const fetchPengguna = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/pengguna'); // ✅ GANTI DI SINI
      const mapped = res.data.map((item) => ({
        ...item,
        namaLengkap: item.nama_lengkap,
        tempatLahir: item.tempat_lahir,
        tanggalLahir: item.tanggal_lahir,
        jenisKelamin: item.jenis_kelamin,
        alamatLengkap: item.alamat_lengkap,
        jenisProfesi: item.jenis_profesi,
        gelarDepan: item.gelar_depan,
        namaDepan: item.nama_depan,
        gelarBelakang: item.gelar_belakang,
      }));
      setPengguna(mapped);
    } catch {
      toast.error('❌ Gagal mengambil data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleKembali = () => navigate(-1);

  const handleEdit = (item) => {
    setEditingData(item);
    setShowTambahPenggunaModal(true);
  };

  const handleHapus = async () => {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    try {
      await api.delete(`/api/pengguna/${confirmDeleteId}`); // ✅ GANTI DI SINI
      toast.success('✅ Pengguna berhasil dihapus');
      fetchPengguna();
    } catch {
      toast.error('❌ Gagal menghapus pengguna');
    } finally {
      setDeletingId(null);
      setShowConfirmModal(false);
      setConfirmDeleteId(null);
    }
  };

  const handleSetPassword = (user) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
  };

  const submitPassword = async (password, jenisPengguna) => {
    if (!password) return;
    try {
      await api.put(`/api/pengguna/${selectedUser.id}/password`, {
        password,
        jenisPengguna,
      }); // ✅ GANTI DI SINI
      toast.success('✅ Password berhasil diperbarui');
    } catch {
      toast.error('❌ Gagal memperbarui password');
    } finally {
      setShowPasswordModal(false);
      setSelectedUser(null);
    }
  };

  const handleCloseModal = () => {
    setShowTambahPenggunaModal(false);
    setEditingData(null);
  };

  const filteredPengguna = pengguna.filter((p) => {
    const cocokStatus = status === '' || (typeof p.status === 'string' && p.status.toLowerCase() === status.toLowerCase());
    const cocokCari =
      (typeof p.namaLengkap === 'string' && p.namaLengkap.toLowerCase().includes(cari.toLowerCase())) ||
      (typeof p.nip === 'string' && p.nip.includes(cari));
    return cocokStatus && cocokCari;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPengguna.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPengguna.length / itemsPerPage);

  return (
    <Container fluid style={{ minHeight: '100vh', background: 'linear-gradient(to right, #6a11cb, #2575fc)', padding: '2rem', fontSize: '0.85rem' }}>
      <ToastContainer position="top-center" />
      <Card className="shadow-lg border-0" style={{ borderRadius: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col md={4}>
              <Button variant="secondary" size="sm" onClick={handleKembali}>← Kembali</Button>
            </Col>
            <Col md={8} className="d-flex justify-content-end gap-2">
              <Form.Select size="sm" value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: '140px' }}>
                <option value="">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </Form.Select>
              <Form.Control type="text" size="sm" placeholder="Cari Nama / NIP" value={cari} onChange={(e) => setCari(e.target.value)} style={{ maxWidth: '240px' }} />
              <Button size="sm" variant="success" onClick={() => setShowTambahPenggunaModal(true)}>+ Tambah</Button>
            </Col>
          </Row>

          <h5 className="mb-3">Daftar Pengguna</h5>

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
                    <th>No</th>
                    <th>NIP</th>
                    <th>Nama Lengkap</th>
                    <th>Tempat / Tgl. Lahir</th>
                    <th>Jenis Kelamin</th>
                    <th>Alamat</th>
                    <th>Profesi</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((p, i) => (
                    <tr key={p.id}>
                      <td>{indexOfFirst + i + 1}</td>
                      <td>{p.nip}</td>
                      <td>{p.namaLengkap || '-'}</td>
                      <td>
                        {p.tempatLahir},{' '}
                        <OverlayTrigger placement="top" overlay={<Tooltip>{p.tanggalLahir}</Tooltip>}>
                          <span>
                            {p.tanggalLahir
                              ? new Date(p.tanggalLahir).toLocaleDateString('id-ID', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                })
                              : '-'}
                          </span>
                        </OverlayTrigger>
                      </td>
                      <td>{p.jenisKelamin || '-'}</td>
                      <td>{p.alamatLengkap || '-'}</td>
                      <td>{p.jenisProfesi || '-'}</td>
                      <td>
                        <Badge bg={p.status === 'Aktif' ? 'success' : 'secondary'}>
                          {p.status || '-'}
                        </Badge>
                      </td>
                      <td>
                        <FaEdit className="me-2 text-primary" style={{ cursor: 'pointer' }} title="Edit" onClick={() => handleEdit(p)} />
                        {deletingId === p.id ? (
                          <Spinner animation="border" size="sm" variant="danger" />
                        ) : (
                          <FaTrash className="me-2 text-danger" style={{ cursor: 'pointer' }} title="Hapus" onClick={() => {
                            setConfirmDeleteId(p.id);
                            setShowConfirmModal(true);
                          }} />
                        )}
                        <FaKey className="text-warning" style={{ cursor: 'pointer' }} title="Atur Password" onClick={() => handleSetPassword(p)} />
                      </td>
                    </tr>
                  ))}
                  {currentItems.length === 0 && (
                    <tr><td colSpan="9" className="text-center">Tidak ada data pengguna.</td></tr>
                  )}
                </tbody>
              </Table>

              {totalPages > 1 && (
                <Pagination className="justify-content-center mt-3">
                  {[...Array(totalPages).keys()].map((num) => (
                    <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => setCurrentPage(num + 1)}>
                      {num + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      <TambahPenggunaModal
        show={showTambahPenggunaModal}
        handleClose={handleCloseModal}
        fetchData={fetchPengguna}
        editingData={editingData}
      />

      <PasswordModal
        show={showPasswordModal}
        handleClose={() => setShowPasswordModal(false)}
        onSubmit={submitPassword}
        penggunaId={selectedUser?.id}
        namaLengkap={selectedUser?.namaLengkap || ''}
      />

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus pengguna ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Batal</Button>
          <Button variant="danger" onClick={handleHapus} disabled={!!deletingId}>
            {deletingId ? 'Menghapus...' : 'Hapus'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Pengguna;
