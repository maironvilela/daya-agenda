export class ApiError extends Error {
    constructor(private statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }

    public getStatusCode() {
        return this.statusCode;
    }
}