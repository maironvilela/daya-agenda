import { CreateHospitalRequest, CreateHospitalResponse, CreateHospitalUseCase } from '@/cadastro/hospital/core/usecases/create-hospital';
import { CreateHospitalRepository } from '../../infra/repositories';
import { GeneratorUUID } from '../../infra/generator-uuid';
import { Validator } from '../../../../../shared-protocols/aplication/validation/usecase-validator';

export class CreateHospitalService implements CreateHospitalUseCase {

    constructor(
        //  private findHospitalByNameRepository: FindHospitalByNameRepository,
        private createHospitalRepository: CreateHospitalRepository,
        private readonly generatorUUid: GeneratorUUID,
        private readonly validator: Validator
    ) { }

    async execute({ address, name }: CreateHospitalRequest): Promise<CreateHospitalResponse> {


        await this.validator.validate({ name, address });
        const addressId = await this.generatorUUid.generator();
        const hospitalId = await this.generatorUUid.generator();

        const hospital = await this.createHospitalRepository.create({
            address: { ...address, id: addressId },
            name,
            id: hospitalId,
        });
        return hospital;
    }
}





