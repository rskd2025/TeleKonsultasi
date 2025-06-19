import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ perbaikan di sini
import { Form, Button, Container, Row, Col, Table, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DaftarPasien = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama_lengkap: '',
    nik: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    no_hp_pasien: '',
    no_hp_pengantar: '',
  });

  const [cari, setCari] = useState('');
  const [hasilCari, setHasilCari] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/pasien', data); // ✅ gunakan `api`
      toast.success('✅ Pasien berhasil didaftarkan');
      const pasienId = res.data.id;

      setData({
        nama_lengkap: '',
        nik: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat: '',
        no_hp_pasien: '',
        no_hp_pengantar: '',
      });

      navigate(`/input-pemeriksaan?id=${pasienId}`);
    } catch (err) {
      console.error('❌ Gagal menyimpan data pasien:', err);
      toast.error('❌ Gagal menyimpan data pasien');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleCari = async () => {
    if (!cari.trim()) return;
    try {
      const res = await api.get(`/api/pasien/cari?query=${encodeURIComponent(cari)}`); // ✅ gunakan `api`
      setHasilCari(res.data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Gagal mencari data pasien');
    }
  };

  return (
    <Container className="mt-4">
      {/* ...seluruh isi form dan tampilan tetap... */}
    </Container>
  );
};

export default DaftarPasien;
