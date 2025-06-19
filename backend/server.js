// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const pemeriksaanRoutes = require('./routes/pemeriksaan');
const faskesRoutes = require('./routes/faskes');
const penggunaRoutes = require('./routes/pengguna');
const userRoutes = require('./routes/users');
const pasienRoutes = require('./routes/pasien');
const feedbackRoutes = require('./routes/feedback'); // ✅ Tambahkan ini

// Gunakan routes
app.use('/api/pemeriksaan', pemeriksaanRoutes);
app.use('/api/faskes', faskesRoutes);
app.use('/api/pengguna', penggunaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pasien', pasienRoutes); // ✅ Penting!
app.use('/api/feedback', feedbackRoutes); // ✅ Tambahkan ini

// Root
app.get('/', (req, res) => {
  res.send('🩺 Mental Health API berjalan!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
