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
// ---------------- index.ts ------------------------------
const Server_1 = require("./servers/Server");
const ServerPool_1 = require("./servers/ServerPool");
const factory_1 = require("./factory");
const MetricsCollector_1 = require("./loadbalancer/MetricsCollector");
// 1. Register backend nodes
[1, 2, 3].forEach((id) => ServerPool_1.ServerPool.instance.register(new Server_1.Server(id)));
// 2. Create load balancer and observer
const lb = (0, factory_1.createLoadBalancer)();
lb.addObserver(new MetricsCollector_1.MetricsCollector());
// 3. Simulate traffic
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 1; i <= 5; i++) {
        yield lb.route({ id: i, path: "/api/pets", authToken: i % 2 ? "token" : undefined });
    }
}))();
