import axios from 'axios';

console.log('Base URL yang digunakan:', process.env.REACT_APP_API_BASE_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

export default api;

