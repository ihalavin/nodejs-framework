const http = require('http');
const EventEmitter = require('events');
const parseQueryParamsMiddleware = require('./Middleware/ParseQueryParametersMiddleware');

module.exports = class Kernel {
    port = 8000;
    middlewares = [];

    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();

        this.registerMiddlewares();
    }

    registerMiddlewares() {
        this.use(parseQueryParamsMiddleware('http://localhost:5000'));
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            });
        });
    }

    listen(port) {
        if (port) {
            this.port = port;
        }

        this.server.listen(this.port, () => console.log(`Server started\nListening on port ${this.port}`));
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

                this.middlewares.forEach(middleware => middleware(req, res));
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
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
