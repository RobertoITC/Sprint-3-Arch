export interface Observer {
    update(event: string, data?: unknown): void;
}

export interface Observable {
    addObserver(obs: Observer): void;
    removeObserver(obs: Observer): void;
    notify(event: string, data?: unknown): void;
}
