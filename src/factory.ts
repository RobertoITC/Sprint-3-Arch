import { AuthHandler } from "./middleware/AuthHandler";
import { LoggingHandler } from "./middleware/LoggingHandler";
import { LoadBalancer } from "./loadbalancer/LoadBalancer";

export function createLoadBalancer() {
    const auth = new AuthHandler();
    const logger = new LoggingHandler();
    auth.setNext(logger);
    return new LoadBalancer(auth);
}