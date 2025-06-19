import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Spinner,
  Badge,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HistoryPasien = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pemeriksaan/riwayat');
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
    <Container className="mt-4" style={{
      background: 'linear-gradient(to right, #e8daef, #f4ecf7)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 style={{
          color: '#5B2C6F',
          fontWeight: '600',
        }}>
          📝 Riwayat Pemeriksaan Pasien
        </h4>
        <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
          ⬅ Kembali
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="secondary" size="sm" />
        </div>
      ) : (
        <div style={{
          overflowX: 'auto',
          borderRadius: '8px',
          backgroundColor: '#fff',
          padding: '10px',
        }}>
          <Table hover responsive size="sm" className="mb-0">
            <thead style={{
              background: 'linear-gradient(to right, #BB8FCE, #D2B4DE)',
              color: '#fff',
            }}>
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
                  <tr key={item.id} style={{ transition: 'background 0.2s' }}>
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
