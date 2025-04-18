
import { Controller } from '@/shared-protocols/presentation/controllers';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {

    return async (req: Request, res: Response) => {

        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
        };


        const httpResponse = await controller.handle(request);


        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json(
                httpResponse.body
            );
        }
    };
};


