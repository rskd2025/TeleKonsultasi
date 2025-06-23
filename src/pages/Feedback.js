// src/pages/Feedback.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useLoading } from '../components/LoadingContext';

const Feedback = ({ userRole = 'admin' }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [tanggal, setTanggal] = useState('');
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/feedback');
      const hasil = Array.isArray(res.data) ? res.data : [];
      setData(hasil);
      setFilteredData(hasil);
    } catch (err) {
      console.error('Gagal mengambil data feedback:', err);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (search) {
      filtered = filtered.filter((item) =>
        item.nama_lengkap?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (tanggal) {
      filtered = filtered.filter((item) =>
        item.tanggal_kunjungan?.slice(0, 10) === tanggal
      );
    }
    setFilteredData(filtered);
  }, [search, tanggal, data]);

  const formatTanggal = (tgl) => {
    if (!tgl) return '-';
    return new Date(tgl).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const jenisKelaminLengkap = (jk) => {
    return jk === 'L' || jk === 'Laki-laki' ? 'Laki-laki' : 'Perempuan';
  };

  const handlePrint = (item) => {
    const doc = new jsPDF();
    doc.setFontSize(11);
    const logo = new Image();
    logo.src = `${window.location.origin}/logo.png`;

    logo.onload = () => {
      doc.addImage(logo, 'PNG', 15, 10, 20, 20);
      doc.setFontSize(12);
      doc.text('JAWABAN KONSUL PASIEN', 105, 20, null, null, 'center');

      let y = 35;
      const info = [
        ['Nama Pasien', item.nama_lengkap],
        ['No. Rekam Medis', item.no_rm || '-'],
        ['Tanggal Lahir', formatTanggal(item.tanggal_lahir)],
        ['Jenis Kelamin', jenisKelaminLengkap(item.jenis_kelamin)],
        ['Umur', item.umur + ' tahun'],
        ['Faskes Asal', item.faskes_asal || '-'],
        ['Tanggal Konsul', formatTanggal(item.tanggal_kunjungan)],
        ['Diagnosa', item.diagnosa || '-'],
        ['Anamnesis', item.anamnesis || '-'],
      ];

      info.forEach(([label, value]) => {
        doc.text(`${label}`, 15, y);
        doc.text(`: ${value}`, 60, y);
        y += 7;
      });

      doc.autoTable({
        head: [['Jawaban Konsul']],
        body: [[item.jawaban_konsul || '-']],
        startY: y + 5,
        styles: { fontSize: 10, cellPadding: 5 },
        theme: 'grid',
        margin: { left: 15, right: 15 },
      });

      const blob = doc.output('blob');
      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    };
  };

  return (
    <Container fluid className="mt-4 mb-5">
      <h5 className="mb-3 text-center fw-bold">Feedback Konsul Pasien</h5>

      <Row className="mb-3 g-2 align-items-center">
        <Col xs={6} md={2}>
          <Button size="sm" variant="secondary" className="w-100" onClick={() => navigate('/dashboard')}>
            Kembali
          </Button>
        </Col>
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Cari nama pasien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="sm"
          />
        </Col>
        <Col xs={12} md={3}>
          <Form.Control
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            size="sm"
          />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <Table striped bordered hover size="sm" className="text-nowrap" style={{ fontSize: '0.85rem', minWidth: '1000px' }} responsive>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Umur</th>
                <th>Faskes Asal</th>
                <th>Tujuan Konsul</th>
                <th>Tanggal</th>
                <th>Diagnosa</th>
                <th>Anamnesis</th>
                <th>Jawaban Konsul</th>
                <th>Cetak</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.umur}</td>
                    <td>{item.faskes_asal || '-'}</td>
                    <td>{item.tujuan_konsul || '-'}</td>
                    <td>{formatTanggal(item.tanggal_kunjungan)}</td>
                    <td>{item.diagnosa || '-'}</td>
                    <td>{item.anamnesis || '-'}</td>
                    <td>{item.jawaban_konsul || '-'}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handlePrint(item)}
                      >
                        Cetak
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-muted">
                    Tidak ada data ditampilkan
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Feedback;
