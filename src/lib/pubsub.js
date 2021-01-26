export default class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(e, cb) {
        if (!this.events.hasOwnProperty(e)) {
            this.events[e] = [];
        }

        return this.events[e].push(cb);
    }

    publish(e, data = {}) {
        if (!this.events.hasOwnProperty(e)) {
            return [];
        }

        return this.events[e].map(cb => cb(data));
    }
}
