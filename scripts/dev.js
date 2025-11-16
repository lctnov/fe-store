#!/usr/bin/env node

/**
 * Development Server Launcher
 * Đọc port từ config.js và khởi động Next.js dev server
 */

const { spawn } = require('child_process');
const config = require('../config.js');

console.log(`🚀 Starting development server on port ${config.port}...`);
console.log(`📡 API: ${config.api.baseURL}`);

const proc = spawn('next', ['dev', '--turbopack', '-p', config.port.toString()], {
  stdio: 'inherit',
  shell: true,
});

proc.on('exit', (code) => {
  process.exit(code);
});
