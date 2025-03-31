const os = require("os");
const fs = require("fs");

const hostname = os.hostname();
const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces.eth0?.[0]?.address || "127.0.0.1";
const version = process.env.VERSION || "1.0";

const html = `
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
`;

fs.writeFileSync("index.html", html);
process.exit(0);
