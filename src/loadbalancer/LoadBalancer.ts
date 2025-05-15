import { Observable, Observer } from "../core/Observer";
import { Handler } from "../middleware/Handler";
import { ServerPool } from "../servers/ServerPool";
import { Request } from "../core/Request";

export class LoadBalancer implements Observable {
    private observers = new Set<Observer>();
    private rrIndex = 0;

    constructor(private chain: Handler) {}

    addObserver(o: Observer) {
        this.observers.add(o);
    }

    removeObserver(o: Observer) {
        this.observers.delete(o);
    }

    notify(event: string, data?: unknown) {
        this.observers.forEach((o) => o.update(event, data));
    }

    async route(req: Request) {
        await this.chain.handle(req);

        const servers = ServerPool.instance.getAll();
        if (!servers.length) throw new Error("No servers registered");

        const server = servers[this.rrIndex % servers.length];
        this.rrIndex++;

        await server.handle(req);
        this.notify("request_routed", { requestId: req.id, serverId: server.id });
    }
}