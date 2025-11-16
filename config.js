/**
 * Frontend Configuration
 * Quản lý các cấu hình chính của ứng dụng
 */

const config = {
  // Frontend Server Port
  port: process.env.PORT || 1212,

  // API Backend Configuration
  api: {
    host: process.env.NEXT_PUBLIC_API_HOST || 'localhost',
    port: process.env.NEXT_PUBLIC_API_PORT || 5000,
    get baseURL() {
      return `http://${this.host}:${this.port}`;
    },
  },

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Logging
  logging: {
    enabled: process.env.NODE_ENV !== 'production',
  },
};

module.exports = config;
