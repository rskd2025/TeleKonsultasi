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
import logo from '../assets/logo.png';

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

  const exportToPDF = (item) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'PNG', 10, 10, 20, 20);

    doc.setFontSize(12);
    doc.text('Jawaban Konsul Pasien', 105, 20, null, null, 'center');

    doc.setFontSize(10);
    const jenisKelamin = item.jenis_kelamin === 'Laki-laki' ? 'Laki-laki' : 'Perempuan';

    const body = [
      ['No RM', item.no_rm || '-'],
      ['Nama', item.nama_lengkap || '-'],
      ['Jenis Kelamin', jenisKelamin],
      ['Umur', item.umur + ' tahun'],
      ['Faskes Asal', item.faskes_asal || '-'],
      ['Tujuan Konsul', item.tujuan_konsul || '-'],
      ['Diagnosa', item.diagnosa || '-'],
      ['Anamnesis', item.anamnesis || '-'],
    ];

    doc.autoTable({
      body,
      startY: 35,
      styles: { fontSize: 9 },
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 130 },
      },
      showHead: 'never',
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Jawaban Konsul']],
      body: [[item.jawaban_konsul || '-']],
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [220, 220, 220] },
      columnStyles: { 0: { cellWidth: 180 } },
    });

    doc.save(`feedback_${item.no_rm || 'pasien'}.pdf`);
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
          <Table
            striped
            bordered
            hover
            size="sm"
            className="text-nowrap"
            style={{ fontSize: '0.85rem', minWidth: '1100px' }}
            responsive
          >
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>No RM</th>
                <th>Umur</th>
                <th>Faskes Asal</th>
                <th>Tujuan Konsul</th>
                <th>Tanggal</th>
                <th>Diagnosa</th>
                <th>Anamnesis</th>
                <th>Jawaban Konsul</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.no_rm}</td>
                    <td>{item.umur}</td>
                    <td>{item.faskes_asal || '-'}</td>
                    <td>{item.tujuan_konsul || '-'}</td>
                    <td>{formatTanggal(item.tanggal_kunjungan)}</td>
                    <td>{item.diagnosa || '-'}</td>
                    <td>{item.anamnesis || '-'}</td>
                    <td>{item.jawaban_konsul || '-'}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => exportToPDF(item)}
                      >
                        Cetak
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center text-muted">
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
