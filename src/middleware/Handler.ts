    import { Request } from "../core/Request";

    export abstract class Handler {
        protected next: Handler | null = null;

        setNext(next: Handler) {
            this.next = next;
            return next;
        }

        async handle(req: Request): Promise<boolean> {
            const proceed = await this.process(req);
            if (!proceed) {
                return false;
            }
            if (this.next) {
                return this.next.handle(req);
            }
            return true;
        }

        protected abstract process(req: Request): Promise<boolean>;
    }