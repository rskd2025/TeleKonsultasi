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

  const exportToExcel = () => {
    const rows = filteredData.map((item, i) => ({
      No: i + 1,
      'No. RM': item.no_rm || '-',
      Nama: item.nama_lengkap,
      Umur: item.umur,
      'Faskes Asal': item.faskes_asal || '-',
      'Tujuan Konsul': item.tujuan_konsul || '-',
      Tanggal: formatTanggal(item.tanggal_kunjungan),
      Diagnosa: item.diagnosa || '-',
      Anamnesis: item.anamnesis || '-',
      'Jawaban Konsul': item.jawaban_konsul || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback');
    XLSX.writeFile(workbook, 'feedback_konsul.xlsx');
  };

  const exportSinglePDF = (item) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const logoImg = new Image();
    logoImg.src = '/logo.png';

    logoImg.onload = () => {
      doc.addImage(logoImg, 'PNG', 10, 10, 25, 25);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('RSKD PROVINSI MALUKU', 40, 15);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Jl. Laksdya Leo Wattimena Ambon', 40, 20);
      doc.text('AMBON - MALUKU', 40, 25);
      doc.setFontSize(10);

      const jenisKelamin = item.jenis_kelamin === 'Laki-laki' ? 'Laki-laki' : 'Perempuan';
      const detailPasien = [
        [`No. RM`, `: ${item.no_rm || '-'}`],
        [`Nama Pasien`, `: ${item.nama_lengkap}`],
        [`Tgl Lahir`, `: ${item.tanggal_lahir ? new Date(item.tanggal_lahir).toLocaleDateString('id-ID') : '-'}`],
        [`Umur`, `: ${item.umur} th`, `Jenis Kelamin`, `: ${jenisKelamin}`],
      ];

      let y = 35;
      detailPasien.forEach((row) => {
        doc.text(row[0], 10, y);
        doc.text(row[1], 45, y);
        if (row[2]) doc.text(row[2], 120, y);
        if (row[3]) doc.text(row[3], 155, y);
        y += 6;
      });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('JAWABAN KONSUL PASIEN', 105, y + 5, null, null, 'center');

      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.rect(10, y + 10, 190, 40);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(item.jawaban_konsul || '-', 15, y + 15, { maxWidth: 180 });

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
        <Col xs={12} md={4}>
          <div className="d-flex flex-wrap gap-2">
            <Button size="sm" variant="primary" onClick={fetchFeedback}>
              Refresh
            </Button>
            <Button size="sm" variant="success" onClick={exportToExcel}>
              Export Excel
            </Button>
          </div>
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
                <th>No. RM</th>
                <th>Nama</th>
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
                    <td>{item.no_rm || '-'}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.umur}</td>
                    <td>{item.faskes_asal || '-'}</td>
                    <td>{item.tujuan_konsul || '-'}</td>
                    <td>{formatTanggal(item.tanggal_kunjungan)}</td>
                    <td>{item.diagnosa || '-'}</td>
                    <td>{item.anamnesis || '-'}</td>
                    <td>{item.jawaban_konsul || '-'}</td>
                    <td className="text-center">
                      <Button size="sm" variant="danger" onClick={() => exportSinglePDF(item)}>
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
