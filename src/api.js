import axios from 'axios';

const api = axios.create({
  baseURL: 'https://8675-36-83-213-135.ngrok-free.app',
  withCredentials: true, // ✅ WAJIB!
  });

export default api;
