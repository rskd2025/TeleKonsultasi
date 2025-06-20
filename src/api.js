// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://84d7-36-83-213-135.ngrok-free.app', // sesuai ngrok aktif
});

export default api;
