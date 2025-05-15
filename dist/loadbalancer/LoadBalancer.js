"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadBalancer = void 0;
const ServerPool_1 = require("../servers/ServerPool");
class LoadBalancer {
    constructor(chain) {
        this.chain = chain;
        this.observers = new Set();
        this.rrIndex = 0;
    }
    addObserver(o) {
        this.observers.add(o);
    }
    removeObserver(o) {
        this.observers.delete(o);
    }
    notify(event, data) {
        this.observers.forEach((o) => o.update(event, data));
    }
    route(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chain.handle(req);
            const servers = ServerPool_1.ServerPool.instance.getAll();
            if (!servers.length)
                throw new Error("No servers registered");
            const server = servers[this.rrIndex % servers.length];
            this.rrIndex++;
            yield server.handle(req);
            this.notify("request_routed", { requestId: req.id, serverId: server.id });
        });
    }
}
exports.LoadBalancer = LoadBalancer;
