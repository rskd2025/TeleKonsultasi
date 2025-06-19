import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Table,
} from 'react-bootstrap';
import api from '../api'; // ✅ gunakan path relatif
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Feedback = ({ userRole = 'admin' }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tanggal, setTanggal] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/pemeriksaan/riwayat'); // ✅ sudah pakai baseURL
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error('❌ Gagal mengambil data:', err);
      toast.error('❌ Gagal mengambil data feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (search) {
      filtered = filtered.filter((item) =>
        item.nama_lengkap?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (tanggal) {
      filtered = filtered.filter((item) => item.tanggal === tanggal);
    }

    if (userRole !== 'admin') {
      filtered = filtered.filter((item) => item.tujuan_konsul === userRole);
    }

    setFilteredData(filtered);
  }, [search, tanggal, data, userRole]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Feedback');
    XLSX.writeFile(wb, 'FeedbackKonsul.xlsx');
  };

  const exportToWord = () => {
    const html = document.getElementById('feedback-table').outerHTML;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    saveAs(blob, 'FeedbackKonsul.doc');
  };

  const exportToPDF = () => {
    const input = document.getElementById('feedback-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('FeedbackKonsul.pdf');
    });
  };

  const exportToImage = () => {
    const input = document.getElementById('feedback-table');
    html2canvas(input).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'FeedbackKonsul.jpg');
      });
    });
  };

  return (
    <Container className="mt-4">
      <h5 className="mb-3">📋 Feedback Konsul Pasien</h5>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Cari nama pasien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="sm"
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            size="sm"
          />
        </Col>
        <Col md={4} className="d-flex gap-2">
          <Button size="sm" variant="success" onClick={exportToExcel}>Excel</Button>
          <Button size="sm" variant="primary" onClick={exportToWord}>Word</Button>
          <Button size="sm" variant="danger" onClick={exportToPDF}>PDF</Button>
          <Button size="sm" variant="warning" onClick={exportToImage}>JPG</Button>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <Table striped bordered hover size="sm" id="feedback-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Umur</th>
              <th>Faskes Asal</th>
              <th>Tujuan Konsul</th>
              <th>Tanggal</th>
              <th>Diagnosa</th>
              <th>Anamnesis</th>
              <th>Jawaban Konsul</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.nama_lengkap}</td>
                <td>{item.umur}</td>
                <td>{item.faskes_asal}</td>
                <td>{item.tujuan_konsul}</td>
                <td>{item.tanggal}</td>
                <td>{item.diagnosa}</td>
                <td>{item.anamnesis}</td>
                <td>{item.jawaban_konsul || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Feedback;
