const proxy = require('http-proxy-middleware');

const apiUrl = 'http://localhost:51357';

module.exports = (app) => {
    app.use(
        proxy('/api', {
            target: apiUrl,
            changeOrigin: true,
        })
    );
};