import { CreateHospitalService } from '@/cadastro/hospital/aplication/usecases/create-hospital';
import { CreateHospitalController } from '@/cadastro/hospital/presentation/controllers/create-hospital-controller';
import { Controller } from '@/shared-protocols/presentation/controllers';
import { makeCreateHospitalControllerValidation } from './create-hospital-controller-validation-factory';
import { PrismaHospitalRepository } from '@/cadastro/hospital/infra/repositories/client-repository/prisma/prisma-hospital-repository';
import { CryptoGenerateUUID } from '@/cadastro/hospital/aplication/infra/generatorUUID/crypto-generate-uuid';
import { CreateHospitalServiceValidator } from '../usecases/create-hospital-service-validator-factory';

export const makeCreateHospitalController = (): Controller => {
    const prismaHospitalRepository = new PrismaHospitalRepository();


    const generatorUUid = new CryptoGenerateUUID();
    const validator = new CreateHospitalServiceValidator(prismaHospitalRepository);
    const createHospitalService = new CreateHospitalService(prismaHospitalRepository, generatorUUid, validator);
    const validationComposite = makeCreateHospitalControllerValidation();
    return new CreateHospitalController(createHospitalService, validationComposite);

};



