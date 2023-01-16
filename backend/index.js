import dotenv from 'dotenv';
import connectDB from './src/config/connectDB';

dotenv.config();
if (process.argv.at(-1) === '--NODE_ENV=development') {
  console.clear();
  process.env.NODE_ENV = 'development';
} else process.env.NODE_ENV ||= 'production';

process.env.PORT ||= 8000;

import io from './src/socket.js';
import server from './src/server.js';
io.attach(server);
connectDB();
/**
 * MONGODB Connection
 */
