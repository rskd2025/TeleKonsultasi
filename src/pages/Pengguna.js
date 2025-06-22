import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TambahPenggunaModal from './TambahPenggunaModal';
import PasswordModal from './PasswordModal';
import {
  Container, Card, Form, Row, Col, Button,
  Table, Spinner, Modal, OverlayTrigger,
  Tooltip, Pagination, Badge
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaKey } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useLoading } from '../components/LoadingContext';
import api from '../api';
import 'react-toastify/dist/ReactToastify.css';

const Pengguna = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [status, setStatus] = useState('');
  const [cari, setCari] = useState('');
  const [pengguna, setPengguna] = useState([]);
  const [editingData, setEditingData] = useState(null);
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
      const res = await api.get('/api/pengguna');
      const mapped = res.data.map((item) => ({
        ...item,
        namaLengkap: item.nama_lengkap,
        tempatLahir: item.tempat_lahir,
        tanggalLahir: item.tanggal_lahir,
        jenisKelamin: item.jenis_kelamin,
        alamatLengkap: item.alamat_lengkap,
        jenisProfesi: item.jenis_profesi,
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
      await api.delete(`/api/pengguna/${confirmDeleteId}`);
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

  const handleSetPassword = async (user) => {
    try {
      const res = await api.get(`/api/pengguna/${user.id}/akun`);
      const akun = res.data || {};
      setSelectedUser({
        ...user,
        username: akun.username || '',
        role: akun.role || 'petugas input',
      });
      setShowPasswordModal(true);
    } catch {
      toast.error('❌ Gagal mengambil akun pengguna');
    }
  };

  const submitPassword = async (username, password, role = 'petugas input') => {
    if (!username || !password) return;
    try {
      await api.put(`/api/pengguna/${selectedUser.id}/password`, {
        username,
        password,
        role,
      });
      toast.success('✅ Password berhasil diperbarui');
      fetchPengguna();
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
    const cocokStatus = status === '' || (p.status?.toLowerCase() === status.toLowerCase());
    const cocokCari =
      (p.namaLengkap?.toLowerCase().includes(cari.toLowerCase()) ||
       p.nip?.includes(cari));
    return cocokStatus && cocokCari;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPengguna.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPengguna.length / itemsPerPage);

  return (
    <Container fluid className="py-4" style={{ minHeight: '100vh' }}>
      <ToastContainer position="top-center" />
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col md={4}>
              <Button variant="secondary" size="sm" onClick={handleKembali}>
                ← Kembali
              </Button>
            </Col>
            <Col md={8} className="d-flex justify-content-end flex-wrap gap-2">
              <Form.Select
                size="sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ maxWidth: '140px' }}
              >
                <option value="">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </Form.Select>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Cari Nama / NIP"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                style={{ maxWidth: '240px' }}
              />
              <Button size="sm" variant="success" onClick={() => setShowTambahPenggunaModal(true)}>
                + Tambah
              </Button>
            </Col>
          </Row>

          <h5 className="mb-3">Daftar Pengguna</h5>

          <Table responsive bordered hover size="sm" className="text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>NIP</th>
                <th>Nama</th>
                <th>TTL</th>
                <th>JK</th>
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
                    {p.tempatLahir},&nbsp;
                    <OverlayTrigger placement="top" overlay={<Tooltip>{p.tanggalLahir}</Tooltip>}>
                      <span>
                        {new Date(p.tanggalLahir).toLocaleDateString('id-ID')}
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>{p.jenisKelamin || '-'}</td>
                  <td>{p.alamatLengkap || '-'}</td>
                  <td>{p.jenisProfesi || '-'}</td>
                  <td>
                    <Badge bg={p.status === 'Aktif' ? 'success' : 'secondary'}>
                      {p.status}
                    </Badge>
                  </td>
                  <td>
                    <FaEdit
                      className="me-2 text-primary"
                      title="Edit"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEdit(p)}
                    />
                    {deletingId === p.id ? (
                      <Spinner animation="border" size="sm" variant="danger" />
                    ) : (
                      <FaTrash
                        className="me-2 text-danger"
                        title="Hapus"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setConfirmDeleteId(p.id);
                          setShowConfirmModal(true);
                        }}
                      />
                    )}
                    <FaKey
                      className="text-warning"
                      title="Atur Password"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSetPassword(p)}
                    />
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    Tidak ada data pengguna.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="justify-content-center">
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
        defaultUsername={selectedUser?.username || ''}
        defaultRole={selectedUser?.role || 'petugas input'}
      />

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Yakin ingin menghapus pengguna ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleHapus} disabled={!!deletingId}>
            {deletingId ? 'Menghapus...' : 'Hapus'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Pengguna;
