import { Server } from "./Server";

export class ServerPool {
    private static _instance: ServerPool | null = null;
    private servers: Server[] = [];
    private constructor() {}

    static get instance(): ServerPool {
        if (!this._instance) this._instance = new ServerPool();
        return this._instance;
    }

    register(server: Server) {
        this.servers.push(server);
    }

    getAll(): Server[] {
        return this.servers;
    }
}