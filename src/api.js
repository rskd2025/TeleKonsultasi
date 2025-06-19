// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f530-36-83-222-191.ngrok-free.app', // sesuai ngrok aktif
});

export default api;
