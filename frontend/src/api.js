// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ee6b-36-83-208-154.ngrok-free.app',
});

export default api;
