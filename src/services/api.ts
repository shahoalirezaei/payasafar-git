// src/components/services/api.ts
import axios from 'axios';

// آدرس پروکسی برای جلوگیری از خطای CORS
const API_BASE_URL = '/api/proxy';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});