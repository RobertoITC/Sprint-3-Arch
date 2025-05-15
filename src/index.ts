import { Server } from "./servers/Server";
import { ServerPool } from "./servers/ServerPool";
import { createLoadBalancer } from "./factory";
import { MetricsCollector } from "./loadbalancer/MetricsCollector";

[1, 2, 3].forEach((id) => ServerPool.instance.register(new Server(id)));

const lb = createLoadBalancer();
lb.addObserver(new MetricsCollector());

(async () => {
    for (let i = 1; i <= 5; i++) {
        await lb.route({ id: i, path: "/api/pets", authToken: i % 2 ? "token" : undefined });
    }
})();
