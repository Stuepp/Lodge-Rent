import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
  //baseURL: process.env.BASE_URL
});

export default api;