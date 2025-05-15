"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsCollector = void 0;
class MetricsCollector {
    constructor() {
        this.total = 0;
    }
    update(event) {
        if (event === "request_routed") {
            this.total++;
            console.log(`📈  Total handled: ${this.total}`);
        }
    }
}
exports.MetricsCollector = MetricsCollector;
