import http from 'http';
import app from './app.js';

const server = http.createServer(app);
server.listen(8000, () => {
  const [connectedPort] = server._connectionKey.match(/\d+$/);
  console.log(`App running on port "${connectedPort}"`);
});

export default server;
