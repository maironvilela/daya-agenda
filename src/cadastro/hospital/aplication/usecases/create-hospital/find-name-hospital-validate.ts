import { CreateHospitalRequest } from '@/cadastro/hospital/core/usecases/create-hospital';
import { UseCaseValidate } from '../../../../../shared-protocols/aplication/validation/usecase-validate';
import { HospitalAlreadyExistisError } from '../../errors/hospital-alread-existis-error';
import { FindHospitalByNameRepository } from '../../infra/repositories/find-hostpital-by-name-repository';

export class FindNameHospitalValidator implements UseCaseValidate<CreateHospitalRequest> {
    constructor(private findHospitalByNameRepository: FindHospitalByNameRepository) { }
    async execute({ name }: CreateHospitalRequest): Promise<void> {
        const hospital = await this.findHospitalByNameRepository.findByName({ name });
        if (hospital) {
            throw new HospitalAlreadyExistisError();
        }
    }
}

