import axios from 'axios';

const api = axios.create({
  baseURL: 'https://9aee-36-83-213-135.ngrok-free.app',
  withCredentials: true,
});

export default api;
