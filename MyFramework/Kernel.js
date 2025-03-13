const http = require('http');
const EventEmitter = require('events');

module.exports = class Kernel {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method];
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    this.middlewares.forEach(middleware => middleware(req, res));

                    handler(req, res);
                });
            });
        });
    }

    listen(port = 8000) {
        this.server.listen(port, () => console.log(`Server started\nListening on port ${port}`));
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }

                const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res);
                if (!emitted) {
                    res.statusCode = 404;
                    res.end('Not Found');
                }
            });
        });
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}
