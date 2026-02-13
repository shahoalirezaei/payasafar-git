/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*', // ما به این آدرس درخواست می‌زنیم
        destination: 'http://test.payasafar.com/api/:path*', // نکست جی‌اس مخفیانه به اینجا می‌فرستد
      },
    ]
  },
};

export default nextConfig;