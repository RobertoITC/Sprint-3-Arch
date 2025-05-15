import { Handler } from "./Handler";
import { Request } from "../core/Request";

export class LoggingHandler extends Handler {
    protected async process(req: Request): Promise<boolean> {
        console.log(`ℹ️   Incoming request #${req.id} -> ${req.path}`);
        return true;
    }
}