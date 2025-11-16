#!/usr/bin/env node

/**
 * Production Server Launcher
 * Đọc port từ config.js và khởi động Next.js start server
 */

const { spawn } = require('child_process');
const config = require('../config.js');

console.log(`🚀 Starting production server on port ${config.port}...`);
console.log(`📡 API: ${config.api.baseURL}`);

const proc = spawn('next', ['start', '-p', config.port.toString()], {
  stdio: 'inherit',
  shell: true,
});

proc.on('exit', (code) => {
  process.exit(code);
});
