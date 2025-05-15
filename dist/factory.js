"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoadBalancer = createLoadBalancer;
// ---------------- factory.ts ----------------------------
const AuthHandler_1 = require("./middleware/AuthHandler");
const LoggingHandler_1 = require("./middleware/LoggingHandler");
const LoadBalancer_1 = require("./loadbalancer/LoadBalancer");
function createLoadBalancer() {
    const auth = new AuthHandler_1.AuthHandler();
    const logger = new LoggingHandler_1.LoggingHandler();
    auth.setNext(logger);
    return new LoadBalancer_1.LoadBalancer(auth);
}
