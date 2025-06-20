import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Spinner,
  Badge,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from 'api';
import { useLoading } from '../components/LoadingContext';

const HistoryPasien = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  const timer = setTimeout(() => setLoading(false), 500); // atau setelah fetch data

    const fetchHistory = async () => {
      try {
        const res = await api.get('/api/pemeriksaan/riwayat');
        setData(res.data);
      } catch (err) {
        console.error('❌ Gagal mengambil riwayat:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'menunggu':
        return <Badge bg="warning">Menunggu</Badge>;
      case 'selesai':
        return <Badge style={{ backgroundColor: '#8E44AD' }}>Selesai</Badge>;
      case 'batal':
        return <Badge bg="secondary">Batal</Badge>;
      default:
        return <Badge bg="dark">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="mt-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-dark">
          📝 Riwayat Pemeriksaan Pasien
        </h5>
        <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
          ⬅ Kembali
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="secondary" size="sm" />
        </div>
      ) : (
        <div
          style={{
            overflowX: 'auto',
            background: '#fff',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 0 5px rgba(0,0,0,0.1)',
          }}
        >
          <Table
            hover
            responsive
            size="sm"
            className="mb-0 text-nowrap align-middle"
            style={{ fontSize: '0.85rem', minWidth: '900px' }}
          >
            <thead
              style={{
                background: 'linear-gradient(to right, #BB8FCE, #D2B4DE)',
                color: '#fff',
              }}
            >
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>JK</th>
                <th>Umur</th>
                <th>Tanggal</th>
                <th>Faskes Asal</th>
                <th>Tujuan</th>
                <th>Diagnosa</th>
                <th>Anamnesis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center text-muted">
                    Tidak ada riwayat pemeriksaan.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.umur} th</td>
                    <td>{formatTanggal(item.tanggal)}</td>
                    <td>{item.faskes_asal}</td>
                    <td>{item.tujuan_konsul}</td>
                    <td>{item.diagnosa}</td>
                    <td>{item.anamnesis}</td>
                    <td>{renderStatus(item.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default HistoryPasien;
