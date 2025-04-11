import express, { Express } from 'express';
import setupRoutes from './router';
import { setupSwagger } from './setupSwagger';
import setupMiddlewares from './middlewares';


export const setupApp = (): Express => {
    const app = express();
    setupSwagger(app);
    setupMiddlewares(app);
    setupRoutes(app);
    return app;
};