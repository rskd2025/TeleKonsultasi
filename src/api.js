import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tekosiwalima.my.id',
  withCredentials: true,
});

export default api;

