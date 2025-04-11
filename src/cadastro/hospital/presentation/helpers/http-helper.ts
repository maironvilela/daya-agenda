import { HttpResponse } from '@/shared-protocols/presentation/controllers';
import { ServerError } from '../errors/serer-error';


export const badRequest = (data: any): HttpResponse => ({
    statusCode: 400,
    body: data
});

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
});


export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
});


export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data
});

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: null
});

export const serverError = (error: any): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error?.stack)
});