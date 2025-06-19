import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import api from 'api';

const ModalFeedback = ({ show, onHide, pasien, onSuccess, userName }) => {
  const [jawaban, setJawaban] = useState('');
  const [sukses, setSukses] = useState(false);

  const handleSimpan = async () => {
    if (!jawaban.trim()) {
      alert('Harap isi jawaban konsul.');
      return;
    }

    try {
      await api.post('/api/feedback', {
        pasien_id: pasien.id,
        nama_pasien: pasien.nama_pasien,
        diagnosa: pasien.diagnosa,
        anamnesis: pasien.anamnesis,
        jawaban,
        konsultan: userName,
      });

      await api.delete(`/api/pemeriksaan/${pasien.id}`); // pindahkan dari daftar kunjungan
      setSukses(true);
      setTimeout(() => {
        onSuccess();       // refresh data
        onHide();          // tutup modal
        setSukses(false);  // reset pesan sukses
        setJawaban('');    // kosongkan field
      }, 1000);
    } catch (err) {
      console.error('Gagal simpan feedback:', err);
      alert('Terjadi kesalahan saat menyimpan.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Form Feedback Konsul</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {sukses && <Alert variant="success">✅ Feedback berhasil disimpan.</Alert>}
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Nama Pasien</Form.Label>
                <Form.Control size="sm" value={pasien.nama_pasien} disabled />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Diagnosa</Form.Label>
                <Form.Control size="sm" as="textarea" rows={2} value={pasien.diagnosa} disabled />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Anamnesis</Form.Label>
                <Form.Control size="sm" as="textarea" rows={4} value={pasien.anamnesis} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Jawaban Konsul ({userName})</Form.Label>
            <Form.Control
              size="sm"
              as="textarea"
              rows={3}
              value={jawaban}
              onChange={(e) => setJawaban(e.target.value)}
              placeholder="Masukkan jawaban konsul di sini..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onHide}>
          Batal
        </Button>
        <Button variant="primary" size="sm" onClick={handleSimpan}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFeedback;
