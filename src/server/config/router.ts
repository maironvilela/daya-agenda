import { Express, Router } from 'express';
import hospitalRouter from '@/cadastro/hospital/main/routers/hospital-router';

export default (app: Express): void => {
    const router = Router();
    app.use('/api', router);
    hospitalRouter(router);
};