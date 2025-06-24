import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import logo from '../assets/maluku.png';
import UbahPasswordModal from './UbahPasswordModal';
import { useLoading } from '../components/LoadingContext';
import api from '../api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const { setLoading } = useLoading();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const groupAkses = user.groupAkses || [];
  const modulAkses = user.modulAkses || [];

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [statistik, setStatistik] = useState([]);
  const [jenisStatistik, setJenisStatistik] = useState('perbulan');
  const [total, setTotal] = useState({ pasien: '-', faskes: '-', user: '-' });
  const [pemeriksaan, setPemeriksaan] = useState({
    total_pasien: 0,
    sudah_diperiksa: 0,
    belum_diperiksa: 0,
  });

  const isAdmin = groupAkses.includes('Admin');

  const tombolNavigasi = [
    { label: 'Menu', to: '/menu' },
    { label: 'Ubah Password', to: '#' },
    { label: 'Pendaftaran Pasien', to: '/pendaftaran-pasien' },
    { label: 'Feedback Konsul', to: '/feedback' },
    { label: 'Kunjungan Pasien', to: '/kunjungan-pasien' },
    { label: 'History Pasien', to: '/history-pasien' },
  ];

  const fiturAkses = isAdmin
    ? tombolNavigasi.map((btn) => btn.label)
    : ['Ubah Password', ...modulAkses.map((modul) => (modul === 'Input Pasien' ? 'Pendaftaran Pasien' : modul))];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    const getStatistik = async () => {
      try {
        const res = await api.get(`/api/statistik/${jenisStatistik}`);
        setStatistik(res.data);
      } catch (err) {
        console.error('🚫 Gagal ambil data statistik:', err.message);
        setStatistik([]);
      }
    };
    getStatistik();
  }, [jenisStatistik]);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await api.get('/api/statistik/total');
        setTotal(res.data);
      } catch (err) {
        console.error('🚫 Gagal ambil total statistik:', err.message);
      }
    };

    const fetchPemeriksaan = async () => {
      try {
        const res = await api.get('/api/statistik/pemeriksaan');
        setPemeriksaan(res.data);
      } catch (err) {
        console.error('🚫 Gagal ambil data pemeriksaan:', err.message);
      }
    };

    fetchTotal();
    fetchPemeriksaan();
  }, []);

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
      <style>
        {`
          .blink {
            animation: blink-animation 1s steps(5, start) infinite;
          }
          @keyframes blink-animation {
            to { visibility: hidden; }
          }
        `}
      </style>

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

        <Row className="mb-4 g-3 text-center text-dark">
          <Col xs={12} sm={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Pasien</Card.Title>
                <h3>{pemeriksaan.total_pasien ?? 0}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Faskes</Card.Title>
                <h3>{total.faskes}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Pengguna</Card.Title>
                <h3>{total.user}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ✅ Info Pasien */}
        <Row className="mb-4 text-center text-dark">
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="fw-bold mb-3">Info Pasien</Card.Title>
                <div className="fw-bold mb-2">
                  Total Terdaftar: {pemeriksaan.total_pasien}&nbsp;&nbsp;|&nbsp;&nbsp;
                  Sudah Diperiksa: {pemeriksaan.sudah_diperiksa}&nbsp;&nbsp;|&nbsp;&nbsp;
                  Belum Diperiksa: {pemeriksaan.belum_diperiksa}
                </div>
                <div className="text-warning d-flex align-items-start justify-content-center" style={{ fontSize: '0.9rem' }}>
                  <span className="me-2 blink">⚠️</span>
                  <span>
                    Terdapat {pemeriksaan.belum_diperiksa} pasien yang sudah terdaftar namun belum diperiksa karena pengisian form belum lengkap.
                    <br />
                    <strong>
                      (Silakan ke menu <u>Daftar Pasien</u> dan cari Nama atau No. RM, lalu lanjutkan pendaftaran)
                    </strong>
                  </span>
                </div>
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

        {/* Statistik Grafik */}
        <div className="mt-4 text-center">
          <h5 className="mb-3">📊 Statistik Pasien</h5>
          <Form.Select
            value={jenisStatistik}
            onChange={(e) => setJenisStatistik(e.target.value)}
            style={{ maxWidth: '200px', margin: '0 auto' }}
            size="sm"
          >
            <option value="perhari">per Hari</option>
            <option value="perbulan">per Bulan</option>
            <option value="pertahun">per Tahun</option>
          </Form.Select>

          <div
            style={{
              height: '250px',
              marginTop: '1rem',
              border: '2px dashed #ccc',
              borderRadius: '10px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '10px',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statistik}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={
                    jenisStatistik === 'perhari'
                      ? 'tanggal'
                      : jenisStatistik === 'perbulan'
                      ? 'bulan'
                      : 'tahun'
                  }
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="jumlah"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={{ r: 4, stroke: '#fff', fill: '#00f0ff', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>

      <UbahPasswordModal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} />
    </div>
  );
};

export default Dashboard;
