/* eslint-disable @typescript-eslint/no-unused-vars */

import { describe, expect, it, vitest } from 'vitest';

import { CreateHospitalService } from '.';

import { FindNameHospitalValidator } from './find-name-hospital-validate';
import { HospitalAlreadyExistisError } from '../../errors/hospital-alread-existis-error';
import { GeneratorUUID } from '../../infra/generator-uuid';
import { FindHospitalByNameRepository, findHospitalByNameRequest, findHospitalByNameResponse } from '@/cadastro/hospital/aplication/infra/repositories/find-hostpital-by-name-repository';
import { CreateHospitalRepository, CreateHospitalRequest, CreateHospitalResponse } from '@/cadastro/hospital/aplication/infra/repositories/create-hospital-reposoritory';

import { Address } from '@/cadastro/hospital/core/models/address';
import { Hospital } from '@/cadastro/hospital/core/models/hospital';
import { CreateHospitalServiceValidator } from '@/cadastro/hospital/main/factories/usecases/create-hospital-service-validator-factory';



type SutTypes = {
    sut: CreateHospitalService,
    findHospitalByNameRepository: FindHospitalByNameRepository
    createHospitalServiceValidator: CreateHospitalServiceValidator
    generatorUUid: GeneratorUUID
}
const makeSut = (): SutTypes => {
    const createHospitalRepository = makeCreateHospitalRepositoryStub();
    const findHospitalByNameRepository = makeFindHospitalByNameRepositoryStub();
    const generatorUUid = makeGeneratorUUidStub();
    const createHospitalServiceValidator = new CreateHospitalServiceValidator(findHospitalByNameRepository);
    const sut = new CreateHospitalService(createHospitalRepository, generatorUUid, createHospitalServiceValidator);

    return {
        sut,
        findHospitalByNameRepository,
        createHospitalServiceValidator,
        generatorUUid
    };


};
const makeCreateHospitalRepositoryStub = (): CreateHospitalRepository => {
    class CreateHospitalRepositoryStub implements CreateHospitalRepository {
        async create(data: CreateHospitalRequest): Promise<CreateHospitalResponse> {
            const address = Address.create({
                id: data.address.id,
                street: data.address.street,
                number: data.address.number,
                city: data.address.city,
                state: data.address.state,
                zipCode: data.address.zipCode,
                neighborhood: data.address.neighborhood,
                complement: ''
            });

            const hospital = Hospital.create({
                id: data.id,
                name: 'Hospital 1',
                address
            });

            return {
                id: data.id,
                name: 'Hospital 1',
                addressId: hospital.getAddress().getId()
            };
        }
    }
    return new CreateHospitalRepositoryStub();

};
const makeFindHospitalByNameRepositoryStub = (): FindHospitalByNameRepository => {
    class FindHospitalByNameRepositoryStub implements FindHospitalByNameRepository {
        async findByName({ name }: findHospitalByNameRequest): Promise<findHospitalByNameResponse> {
            return null;
        }
    }
    return new FindHospitalByNameRepositoryStub();

};
const makeGeneratorUUidStub = (): GeneratorUUID => {
    class GeneratorUUidStub implements GeneratorUUID {
        async generator(): Promise<string> {
            const uuid = (Math.random() * 10000).toPrecision(4).toString();
            return uuid;
        }

    }

    return new GeneratorUUidStub();

};

const makeRequest = () => {
    const address = {
        street: 'Rua 1',
        number: 1,
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345-678',
        complement: '',
        neighborhood: 'Bairro 1'
    };
    return {
        name: 'Hospital 1',
        address
    };


};

describe('CreateHospitalUseCase', () => {

    it('Should be able create a new hospital', async () => {

        const { sut } = makeSut();

        const request = makeRequest();
        const result = await sut.execute(request);


        expect(result?.id).toBeTruthy();
        expect(result?.addressId).toBeTruthy();
        expect(result?.name).toEqual(request.name);




    });

    it('Should be able throw error when the hospital name alread exist', async () => {

        const { sut, findHospitalByNameRepository } = makeSut();

        vitest.spyOn(findHospitalByNameRepository, 'findByName')
            .mockResolvedValueOnce({
                name: 'any_name',
                id: 'any_id',
                addressId: 'any_address_id'
            });

        const request = makeRequest();

        await expect(sut.execute(request)).rejects.toThrowError(HospitalAlreadyExistisError);
    });

    it('Should be able to call generateUUid function 2 times', async () => {

        const { sut, generatorUUid } = makeSut();

        const generatorUUidSpy = vitest.spyOn(generatorUUid, 'generator');

        const request = makeRequest();

        await sut.execute(request);

        expect(generatorUUidSpy).toHaveBeenCalledTimes(2);

    });
});

