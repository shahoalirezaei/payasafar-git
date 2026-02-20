/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // اگر تنظیمات عکس یا چیز دیگری دارید نگه دارید، ولی rewrites را پاک کنید
  images: {
    domains: ['api.test.payasafar.com'], // اگر نیاز است
  },
};

export default nextConfig;