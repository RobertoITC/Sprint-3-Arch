import { Request } from "../core/Request";

export class Server {
    constructor(public readonly id: number) {}

    async handle(req: Request) {
        await new Promise((r) => setTimeout(r, 20));
        console.log(`🟢  Server ${this.id} processed request #${req.id}`);
    }
}
