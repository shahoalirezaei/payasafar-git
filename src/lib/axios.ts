import axios from 'axios';

const apiBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://test.payasafar.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// طبق درخواست پروژه: احراز هویت سمت کاربر پیاده نشده و باید همیشه از توکن هارد استفاده شود.
const HARD_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LXVzZXItaWQiLCJ1bmlxdWVfbmFtZSI6IkRldmVsb3BlclRlc3QiLCJyb2xlIjoiQWRtaW4iLCJleHAiOjE3NzQxNzc2NDUsImlzcyI6IlBheWFuZWhhVGlja2V0IiwiYXVkIjoiUGF5YW5laGFUaWNrZXQifQ.42l_onehuITJzxaVNve7zIekpJ113Gl9gX3_C3WbvGY";

apiBase.interceptors.request.use((config) => {
  if (HARD_TOKEN) {
    config.headers.Authorization = `Bearer ${HARD_TOKEN}`;
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
