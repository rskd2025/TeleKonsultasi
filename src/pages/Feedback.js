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

  const exportSinglePDF = async (item) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const logo = new Image();
    logo.src = `${window.location.origin}/logo.png`;

    await new Promise((resolve) => {
      logo.onload = resolve;
    });

    doc.addImage(logo, 'PNG', 15, 10, 25, 25);

    let xStart = 45;
    let yStart = 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('RSKD Provinsi Maluku', xStart, yStart);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Jl. Laksdya Leo Wattimena Ambon', xStart, yStart + 6);
    doc.text('Kota Ambon - Provinsi Maluku', xStart, yStart + 12);

    const pasien = [
      `No. RM        : ${item.no_rm || '-'}`,
      `Nama Pasien   : ${item.nama_lengkap}`,
      `Tgl Lahir     : ${item.tanggal_lahir ? new Date(item.tanggal_lahir).toLocaleDateString('id-ID') : '-'}`,
      `Umur          : ${item.umur} tahun`,
      `Jenis Kelamin : ${item.jenis_kelamin || '-'}`,
    ];
    let yIdentitas = yStart + 20;
    doc.setFont('helvetica', 'normal');
    pasien.forEach((line) => {
      doc.text(line, xStart, yIdentitas);
      yIdentitas += 6;
    });

    yIdentitas += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('CATATAN PERKEMBANGAN PASIEN TERINTEGRASI', 105, yIdentitas, null, null, 'center');

    yIdentitas += 8;
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.rect(15, yIdentitas, 180, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(item.jawaban_konsul || '-', 18, yIdentitas + 5, { maxWidth: 175 });

    const blob = doc.output('blob');
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
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
