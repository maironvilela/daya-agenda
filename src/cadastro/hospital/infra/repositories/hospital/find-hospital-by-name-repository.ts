import { FindHospitalByNameRepository, findHospitalByNameRequest, findHospitalByNameResponse } from '@/cadastro/hospital/aplication/infra/repositories/find-hostpital-by-name-repository';

export class FindHospitalByNameRepositoryImp implements FindHospitalByNameRepository {

    constructor(private clientRepository: FindHospitalByNameRepository) { }
    async findByName(data: findHospitalByNameRequest): Promise<findHospitalByNameResponse> {
        return await this.clientRepository.findByName(data);
    }

}