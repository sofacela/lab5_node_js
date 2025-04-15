const os = require('os');
const http = require('http');

const hostname = os.hostname();
const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces.eth0?.[0]?.address || "127.0.0.1";
const version = process.env.VERSION || "1.0";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>Server Info</title>
</head>
<body>
    <h1>Server Info</h1>
    <p>IP: ${ip}</p>
    <p>Hostname: ${hostname}</p>
    <p>Version: ${version}</p>
</body>
</html>
  `);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});