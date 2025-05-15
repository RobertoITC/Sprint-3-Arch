"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPool = void 0;
class ServerPool {
    constructor() {
        this.servers = [];
    }
    static get instance() {
        if (!this._instance)
            this._instance = new ServerPool();
        return this._instance;
    }
    register(server) {
        this.servers.push(server);
    }
    getAll() {
        return this.servers;
    }
}
exports.ServerPool = ServerPool;
ServerPool._instance = null;
