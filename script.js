        // proxy-server.js

        const express = require('express');
        const { createProxyMiddleware } = require('http-proxy-middleware');

        const app = express();
        const PORT = process.env.PORT || 3000;

        // Proxy middleware options
        const proxyOptions = {
            target: '', // target host
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                const targetUrl = req.query.url;
                if (targetUrl) {
                    proxyReq.path = targetUrl;
                }
            },
            pathRewrite: {
                '^/proxy': '/', // rewrite path
            },
        };

        // Proxy endpoint
        app.use('/proxy', createProxyMiddleware(proxyOptions));

        // Serve static files
        app.use(express.static('public'));

        app.listen(PORT, () => {
            console.log(`Proxy server running on port ${PORT}`);
        });
