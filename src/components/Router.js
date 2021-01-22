import { Route } from './Route';

export class Router {
    constructor() {
        this.mode = 'history';
        this.routes = [];
        this.root = '/';
    }

    get root() {
        return this._root;
    }
    set root(val) {
        this._root = val;
    }

    get mode() {
        return this._mode;
    }
    set mode(val) {
        this._mode = 'history' && window.history.pushState ? 'history' : 'hash';
    }

    get routes() {
        return this._routes;
    }
    set routes(val) {
        this._routes = val;
    }

    add = (route) => {
        this.routes.push(new Route(route.name, route.path, route.handler));
        return this;
    }

    navigate = (route) => {
        route = route ? route : '';
        console.log('Router Navigate – ', route);
        this.match(route);
    }

    match = (route) => {
        for (let i = 0; i < this.routes.length; i++) {
            let paramNames = [];
            let regexPath =
                this.routes[i].path.replace(
                    /([:*])(\w+)/g,
                    function (full, colon, name) {
                        paramNames.push(name);
                        return '([^/]+)';
                    }
                );
            // console.log('Route Params – ', paramNames);
            // console.log('Route Regex Path – ', regexPath);

            let routeMatch = route.match(new RegExp(regexPath));
            // console.log('Route Match – ', routeMatch);

            if (routeMatch !== null) {
                let params = routeMatch
                    .slice(1, routeMatch.length)
                    .reduce((params, value, idx) => {
                        if (params === null) params = {};
                        params[paramNames[idx]] = value;
                        return params;
                    }, null);

                if (params === null) {
                    this.routes[i].handler();
                } else {
                    this.routes[i].handler(params);
                }

                this.location(route);
            }
        }
    }

    location = (route) => {
        if (this.mode === 'history') {
            window.history.pushState('', '', this.root + route);
        } else {
            route = route.replace(/^\//, '').replace(/\/$/, '');
            window.location.href =
                window.location.href.replace(/#(.*)$/, '') + '#' + route;
        }
    }
}
