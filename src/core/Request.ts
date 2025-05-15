export interface Request {
    id: number;
    path: string;
    payload?: unknown;
    authToken?: string;
}