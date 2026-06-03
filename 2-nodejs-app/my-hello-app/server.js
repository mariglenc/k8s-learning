const http = require('http');
const os = require('os');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>Hello from version 2.0! 🚀 I have been updated!</h1>
    <p>Served by pod: <strong>${os.hostname()}</strong></p>
    <p>Time: ${new Date().toISOString()}</p>
  `);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});