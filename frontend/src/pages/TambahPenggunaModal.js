import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import api from 'api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahPenggunaModal = ({ show, handleClose, fetchData, editingData }) => {
  const [formData, setFormData] = useState({
    nip: '',
    gelar_depan: '',
    nama_depan: '',
    gelar_belakang: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat_lengkap: '',
    agama: '',
    jenis_profesi: '',
    status: 'Aktif',
  });

  const [loading, setLoading] = useState(false);
  const nipRef = useRef(null);
  const isEditMode = !!editingData;

  const agamaOptions = [
    'Islam', 'Kristen Protestan', 'Kristen Katolik',
    'Hindu', 'Buddha', 'Konghucu', 'Lainnya',
  ];

  useEffect(() => {
    if (editingData) {
      setFormData({
        nip: editingData.nip || '',
        gelar_depan: editingData.gelar_depan || '',
        nama_depan: editingData.nama_depan || editingData.namaLengkap || '',
        gelar_belakang: editingData.gelar_belakang || '',
        tempat_lahir: editingData.tempat_lahir || editingData.tempatLahir || '',
        tanggal_lahir: (editingData.tanggal_lahir || editingData.tanggalLahir || '').split('T')[0] || '',
        jenis_kelamin: editingData.jenis_kelamin || editingData.jenisKelamin || '',
        alamat_lengkap: editingData.alamat_lengkap || editingData.alamatLengkap || '',
        agama: editingData.agama || '',
        jenis_profesi: editingData.jenis_profesi || editingData.jenisProfesi || '',
        status: editingData.status || 'Aktif',
      });
    } else {
      resetForm();
    }
  }, [editingData]);

  useEffect(() => {
    if (show && nipRef.current) {
      setTimeout(() => nipRef.current.focus(), 150);
    }
  }, [show]);

  const resetForm = () => {
    setFormData({
      nip: '',
      gelar_depan: '',
      nama_depan: '',
      gelar_belakang: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      alamat_lengkap: '',
      agama: '',
      jenis_profesi: '',
      status: 'Aktif',
    });
  };

  const validateForm = () => {
    if (!formData.nip) return toast.warn('⚠️ NIP wajib diisi') && false;
    if (!formData.nama_depan) return toast.warn('⚠️ Nama Depan wajib diisi') && false;
    if (!formData.jenis_kelamin) return toast.warn('⚠️ Jenis Kelamin wajib diisi') && false;
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpan = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const nama_lengkap = `${formData.gelar_depan ? formData.gelar_depan + '. ' : ''}${formData.nama_depan}${formData.gelar_belakang ? ' ' + formData.gelar_belakang : ''}`;
    const tanggal_lahir = formData.tanggal_lahir?.trim() ? formData.tanggal_lahir : null;

    const dataToSend = {
      ...formData,
      tanggal_lahir,
      nama_lengkap,
    };

    try {
      if (isEditMode) {
        await api.put(`/api/pengguna/${editingData.id}`, dataToSend);
        toast.success('✅ Data berhasil diperbarui');
      } else {
        await api.post('/api/pengguna', dataToSend);
        toast.success('✅ Data berhasil ditambahkan');
      }

      fetchData();
      handleClose();
      resetForm();
    } catch (err) {
      console.error('❌ Gagal menyimpan:', err);
      toast.error('❌ Gagal menyimpan: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const onHideModal = () => {
    handleClose();
    resetForm();
  };

  return (
    <Modal show={show} onHide={onHideModal} size="lg" centered scrollable>
      <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: 'white' }}>
        <Modal.Title style={{ fontSize: '1rem' }}>
          {isEditMode ? 'Edit Pengguna' : 'Tambah Pengguna'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ fontSize: '0.85rem' }}>
        <Form>
          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>NIP *</Form.Label>
                <Form.Control type="text" name="nip" ref={nipRef} value={formData.nip} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Gelar Depan</Form.Label>
                <Form.Control type="text" name="gelar_depan" value={formData.gelar_depan} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Nama Depan *</Form.Label>
                <Form.Control type="text" name="nama_depan" value={formData.nama_depan} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Gelar Belakang</Form.Label>
                <Form.Control type="text" name="gelar_belakang" value={formData.gelar_belakang} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Tempat Lahir</Form.Label>
                <Form.Control type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Jenis Kelamin *</Form.Label>
                <Form.Control as="select" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
                  <option value="">-- Pilih --</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={8} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Alamat Lengkap</Form.Label>
                <Form.Control as="textarea" rows={2} name="alamat_lengkap" value={formData.alamat_lengkap} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Agama</Form.Label>
                <Form.Control as="select" name="agama" value={formData.agama} onChange={handleChange}>
                  <option value="">-- Pilih Agama --</option>
                  {agamaOptions.map((item, idx) => (
                    <option key={idx} value={item}>{item}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Jenis Profesi</Form.Label>
                <Form.Control type="text" name="jenis_profesi" value={formData.jenis_profesi} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={onHideModal} disabled={loading}>
          Batal
        </Button>
        <Button size="sm" variant="primary" onClick={handleSimpan} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" /> Menyimpan...
            </>
          ) : isEditMode ? 'Perbarui' : 'Simpan'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TambahPenggunaModal;
