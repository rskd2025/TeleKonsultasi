import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5a48-36-83-213-135.ngrok-free.app/api',
  withCredentials: true,
});

export default api;
