import axios from 'axios';

const apiBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://test.payasafar.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// توکن موقتی که فرستادی
const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMTU0Njk3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwOTE5MDk3MzQ3MCIsInJvbGUiOiIwIiwidW5pcXVlX25hbWUiOiLYtNin2YfZiCIsIm5iZiI6MTc3MTUyNzM4NywiZXhwIjoxNzcxNTMwOTg3LCJpYXQiOjE3NzE1MjczODcsImlzcyI6IlBheWFuZWhhVGlja2V0IiwiYXVkIjoiUGF5YW5laGFUaWNrZXQifQ.43EsZzFuasO8EUq7gFWj5Dt0PyvfU6BHhWrpFDLnEFs";

apiBase.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // اولویت با توکنی است که در localStorage ذخیره شده، در غیر این صورت از توکن موقت استفاده کن
    const token = localStorage.getItem("token") || TEMP_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiBase.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
       console.error("توکن منقضی شده یا نامعتبر است!");
    }
    return Promise.reject(error);
  }
);

export default apiBase;