import { Handler } from "./Handler";
import { Request } from "../core/Request";


export  class AuthHandler extends Handler{

  setNext(next: Handler) {
    this.next = next;
    return next;
  }

  async handle(req: Request): Promise<boolean> {
    console.debug(`🔍 Handler: start for request #${req.id}`);
    let proceed: boolean;

    try {
      proceed = await this.process(req);
      console.debug(`🔍 Handler: process returned ${proceed} for request #${req.id}`);
    } catch (err) {
      console.error(`⚠️  Handler.process threw for request #${req.id}:`, err);
      return false;
    }

    if (!proceed) {
      console.debug(`🔍 Handler: stopping chain at request #${req.id}`);
      return false;
    }

    if (this.next) {
      console.debug(`🔍 Handler: passing to next handler for request #${req.id}`);
      const nextResult = await this.next.handle(req);
      console.debug(`🔍 Handler: next handler returned ${nextResult} for request #${req.id}`);
      return nextResult;
    }

    console.debug(`🔍 Handler: end of chain for request #${req.id}`);
    return true;
  }
    protected async process(req: Request): Promise<boolean> {
        console.log(`🔒  AuthHandler: checking auth for request #${req.id}`);
        await new Promise((r) => setTimeout(r, 20));
        const isAuthenticated = Math.random() > 0.5; // Randomly pass or fail auth
        if (!isAuthenticated) {
        console.warn(`❌  AuthHandler: request #${req.id} failed auth`);
        return false;
        }
        console.log(`✅  AuthHandler: request #${req.id} passed auth`);
        return true;
    }

}