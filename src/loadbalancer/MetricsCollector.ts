import { Observer } from "../core/Observer";

export class MetricsCollector implements Observer {
    private total = 0;
    update(event: string): void {
        if (event === "request_routed") {
            this.total++;
            console.log(`📈  Total handled: ${this.total}`);
        }
    }
}