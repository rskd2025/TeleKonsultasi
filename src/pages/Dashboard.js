import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import logo from '../assets/maluku.png';
import UbahPasswordModal from './UbahPasswordModal';
import { useLoading } from '../components/LoadingContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import api from '../api';

const Dashboard = () => {
  const { setLoading } = useLoading();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const groupAkses = user.groupAkses || [];
  const modulAkses = user.modulAkses || [];

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [mode, setMode] = useState('perbulan');
  const [statistik, setStatistik] = useState([]);

  const isAdmin = groupAkses.includes('Admin');

  const tombolNavigasi = [
    { label: 'Menu', to: '/menu' },
    { label: 'Ubah Password', to: '#' },
    { label: 'Daftar Pasien', to: '/daftar-pasien' },
    { label: 'Feedback Konsul', to: '/feedback' },
    { label: 'Kunjungan Pasien', to: '/kunjungan-pasien' },
    { label: 'History Pasien', to: '/history-pasien' },
  ];

  const fiturAkses = isAdmin
    ? tombolNavigasi.map((btn) => btn.label)
    : ['Ubah Password', ...modulAkses.map((modul) =>
        modul === 'Input Pasien' ? 'Daftar Pasien' : modul
      )];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const res = await api.get(`/api/statistik/${mode}`);
        let result = res.data;

        if (mode === 'perbulan') {
          const bulan = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
          result = result.map(item => ({ name: bulan[item.bulan], total: item.total }));
        } else if (mode === 'pertahun') {
          result = result.map(item => ({ name: item.tahun.toString(), total: item.total }));
        } else if (mode === 'perhari') {
          result = result.map(item => ({ name: item.tanggal, total: item.total })).reverse();
        }

        setStatistik(result);
      } catch (err) {
        console.error('Gagal ambil data statistik:', err);
      }
    };
    fetchStatistik();
  }, [mode]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        paddingTop: '50px',
        paddingBottom: '50px',
        overflowX: 'hidden',
      }}
    >
      <Container>
        <div className="d-flex align-items-center justify-content-center mb-4 flex-wrap text-center">
          <img
            src={logo}
            alt="Logo Pemprov Maluku"
            style={{ width: '70px', height: '70px', marginRight: '10px' }}
          />
          <div>
            <h2 className="mb-1 fw-bold">Selamat Datang</h2>
            <h5 style={{ fontSize: '1rem' }}>
              Telekonsultasi Kesehatan Mental<br />RSKD Provinsi Maluku
            </h5>
          </div>
        </div>

        <Row className="mb-4 g-3">
          <Col xs={12} sm={6}>
            <Card className="shadow-sm text-center text-dark">
              <Card.Body>
                <Card.Title>Total Pasien</Card.Title>
                <h3>-</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="shadow-sm text-center text-dark">
              <Card.Body>
                <Card.Title>Total Faskes</Card.Title>
                <h3>-</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center g-3 mb-5">
          {tombolNavigasi
            .filter((btn) => fiturAkses.includes(btn.label))
            .map(({ label, to }, idx) => (
              <Col key={idx} xs={12} sm={6} md={4} lg={2}>
                {label === 'Ubah Password' ? (
                  <Button
                    variant="light"
                    size="lg"
                    className="w-100 shadow-sm fw-semibold"
                    style={{ fontSize: '0.9rem', color: '#2575fc' }}
                    onClick={() => setShowPasswordModal(true)}
                  >
                    {label}
                  </Button>
                ) : (
                  <Link to={to} className="d-block text-decoration-none">
                    <Button
                      variant="light"
                      size="lg"
                      className="w-100 shadow-sm fw-semibold"
                      style={{ fontSize: '0.9rem', color: '#2575fc' }}
                    >
                      {label}
                    </Button>
                  </Link>
                )}
              </Col>
            ))}

          {fiturAkses.length <= 1 && (
            <Col xs={12} className="text-center text-white mt-3">
              Belum ada modul akses yang diberikan. Silakan hubungi Administrator.
            </Col>
          )}
        </Row>

        <div className="mt-4 text-center">
          <h5 className="mb-3">📊 Statistik Pasien</h5>
          <Form.Select
            size="sm"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mb-3"
            style={{ maxWidth: 200, margin: '0 auto' }}
          >
            <option value="perhari">📆 per Hari</option>
            <option value="perbulan">📅 per Bulan</option>
            <option value="pertahun">📊 per Tahun</option>
          </Form.Select>
          <div
            style={{
              height: '300px',
              border: '2px dashed #ccc',
              borderRadius: '10px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '1rem',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statistik}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>

      <UbahPasswordModal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Dashboard;