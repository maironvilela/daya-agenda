import { HttpResponse } from '@/shared-protocols/presentation/controllers/http-response';

export interface Controller<Request = any> {
    handle: (request: Request) => Promise<HttpResponse>
}