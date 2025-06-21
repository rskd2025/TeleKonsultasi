useEffect(() => {
  const fetchFaskes = async () => {
    try {
      const res = await api.get('/faskes/dropdown'); // endpoint sesuai ngrok
      setFaskesOptions(res.data); // langsung assign
    } catch (err) {
      console.error('❌ Gagal ambil faskes:', err);
      toast.error('Gagal memuat data faskes.');
    }
  };

  const getPasienById = async (id) => {
    try {
      const res = await api.get(`/pasien/${id}`);
      setPasien(res.data);
      const tgl = new Date(res.data.tanggal_lahir);
      setTanggalLahir(tgl.toLocaleDateString('id-ID'));
      setUmur(new Date().getFullYear() - tgl.getFullYear());
    } catch (err) {
      console.error('❌ Gagal ambil data pasien:', err);
      toast.error('Gagal memuat data pasien.');
    }
  };

  const init = () => {
    setLoading(true);
    fetchFaskes();

    const timer = setTimeout(() => setLoading(false), 500);

    if (!location.state?.pasien) {
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      if (id) getPasienById(id);
    } else {
      const tgl = new Date(location.state.pasien.tanggal_lahir);
      setTanggalLahir(tgl.toLocaleDateString('id-ID'));
      setUmur(new Date().getFullYear() - tgl.getFullYear());
    }

    return () => clearTimeout(timer);
  };

  init();
}, [location.state, setLoading]);
