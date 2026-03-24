require('dotenv').config();
const http = require('http');
const httpProxy = require('http-proxy');

const port = process.env.GATEWAY_PORT || 5000;
const proxy = httpProxy.createProxyServer({});
proxy.timeout = 10000;

const routeMap = {
    '/sql': process.env.ROUTE_SQL || 'http://sql-api:8000',
    '/verifierIssuer': process.env.ROUTE_VERIFIER || 'http://verifierissuer-api:3000',
    '/mongo': process.env.ROUTE_MONGO || 'http://mongodb-api:4000'
};

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

//Rate Limiting básico por IP
const ipRequests = {};
const RATE_LIMIT = 100;
const WINDOW_MS = 10 * 60 * 1000;

setInterval(() => {
    for (let ip in ipRequests) {
        ipRequests[ip] = 0;
    }
}, WINDOW_MS);

const server = http.createServer((req, res) => {
    // Solo aceptar peticiones del frontend 
    const origin = req.headers.origin;
    if (origin && origin !== ALLOWED_ORIGIN) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('CORS: Origin no permitido');
        console.log(`[${new Date().toISOString()}] Petición rechazada por origen no permitido: ${origin}`);
        return;
    }

    // CORS
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Rate limiting
    const ip = req.connection.remoteAddress;
    ipRequests[ip] = (ipRequests[ip] || 0) + 1;
    if (ipRequests[ip] > RATE_LIMIT) {
        res.writeHead(429, { 'Content-Type': 'text/plain' });
        res.end('Demasiadas peticiones, espera un poco.');
        console.log(`[${new Date().toISOString()}] ${ip} excedió el límite de peticiones`);
        return;
    }

    // Proxy routing
    const route = Object.keys(routeMap).find(r => req.url.startsWith(r));
    if (route) {
        req.url = req.url.replace(route, '');
        proxy.web(req, res, { target: routeMap[route] });
        console.log(`[${new Date().toISOString()}] ${ip} ${req.method} ${route} → ${routeMap[route]}${req.url}`);
    } else {
        res.statusCode = 404;
        res.end('Route not found');
    }
});

proxy.on('error', (err, req, res) => {
    console.error(`[${new Date().toISOString()}] Proxy error: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
});

server.listen(port, () => {
    console.log(`API Gateway listening on http://localhost:${port}`);
});
