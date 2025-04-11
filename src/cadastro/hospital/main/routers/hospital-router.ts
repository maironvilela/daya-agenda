import { Router } from 'express';
import { makeCreateHospitalController } from '@/cadastro/hospital/main/factories/controllers/create-hospital-controller-factory';
import { adaptRoute } from '@/server/adapters/express-route-adapter';

export default (router: Router): void => {
    router.post('/hospital', adaptRoute(makeCreateHospitalController()));
};


