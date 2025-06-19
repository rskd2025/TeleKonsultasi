// src/pages/AksesModal.js
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  ListGroup,
  Card,
} from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AksesModal = ({ isOpen, onClose, user, onSuccess }) => {
  const grupAksesList = ['Admin', 'Psikiatri', 'Psikolog', 'Perawat Jiwa', 'Petugas Input'];
  const modulAksesList = [
    'Menu',
    'Ubah Password',
    'Input Pasien',
    'Kunjungan Pasien',
    'History Pasien',
    'Feedback Konsul',
  ];

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedGroups(user.groupAkses || []);
      setSelectedModules(user.modulAkses || []);
    }
  }, [user]);

  const handleGroupChange = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handleModuleChange = (modul) => {
    setSelectedModules((prev) =>
      prev.includes(modul) ? prev.filter((m) => m !== modul) : [...prev, modul]
    );
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/users/${user.id}`, {
        groupAkses: selectedGroups,
        modulAkses: selectedModules,
      });
      toast.success('✅ Hak akses berhasil disimpan');
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error('❌ Gagal menyimpan hak akses');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Modal show={isOpen} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: 'white' }}>
          <Modal.Title style={{ fontSize: '1rem' }}>
            🔒 Akses Pengguna: <strong>{user?.nama_lengkap}</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: '0.85rem' }}>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Header className="bg-light">
                  <strong>Grup Akses</strong>
                </Card.Header>
                <ListGroup variant="flush">
                  {grupAksesList.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Form.Check
                        type="checkbox"
                        label={item}
                        checked={selectedGroups.includes(item)}
                        onChange={() => handleGroupChange(item)}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>

            <Col md={8}>
              <Card>
                <Card.Header className="bg-light">
                  <strong>Modul Akses</strong>
                </Card.Header>
                <ListGroup variant="flush">
                  {modulAksesList.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Form.Check
                        type="checkbox"
                        label={item}
                        checked={selectedModules.includes(item)}
                        onChange={() => handleModuleChange(item)}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Tutup
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AksesModal;
