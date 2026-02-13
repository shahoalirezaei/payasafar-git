import axios from 'axios';

const apiBase = axios.create({
  baseURL: 'http://test.payasafar.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiBase;