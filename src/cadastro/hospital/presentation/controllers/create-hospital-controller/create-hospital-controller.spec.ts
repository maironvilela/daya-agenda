import { describe, expect, it, vitest } from 'vitest';
import { CreateHospitalController } from '.';
import { CreateHospitalRequest, CreateHospitalResponse, CreateHospitalUseCase } from '@/cadastro/hospital/core/usecases/create-hospital';
import { ValidationComposite } from '../../validations/validation-composite';
import { makeCreateHospitalControllerValidation } from '@/cadastro/hospital/main/factories/controllers/create-hospital-controller-validation-factory';
import { HospitalAlreadyExistisError } from '@/cadastro/hospital/aplication/errors/hospital-alread-existis-error';
import { Validation } from '@/shared-protocols/presentation/controllers';



const makeCreateHospitalUseCase = (): CreateHospitalUseCase => {
    class CreateHospitalUseCaseStub implements CreateHospitalUseCase {
        async execute(request: CreateHospitalRequest): Promise<CreateHospitalResponse> {
            return new Promise((resolve) => resolve({
                id: 'any_id',
                name: request.name,
                addressId: 'any_address_id'

            }));
        }

    }
    return new CreateHospitalUseCaseStub();
};

describe('CreateHospitalController', () => {
    it('should be able to create a new hospital', async () => {

        const createHospitalUseCase = makeCreateHospitalUseCase();
        const validations: Validation[] = [];

        const validationComposite = new ValidationComposite(validations);


        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const result = await sut.handle({
            name: 'any_name',
            address: {
                street: 'any_street',
                number: 0,
                city: 'any_city',
                state: 'any_state',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });



        expect(result.statusCode).toBe(201);
        expect(result.body.id).toBeTruthy();
        expect(result.body.name).toBe('any_name');

        expect(result.body.addressId).toBeTruthy();

    });

    it('Should be able to return 400 if  name param is empty', async () => {
        const validationComposite = makeCreateHospitalControllerValidation();
        const createHospitalUseCase = makeCreateHospitalUseCase();
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const response = await sut.handle({
            name: '',
            address: {
                street: 'any_street',
                number: 0,
                city: 'any_city',
                state: 'any_state',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toContainEqual({
            error: 'MissingParamError',
            message: 'Missing param: name',
        });

    });

    it('Should be able to return 400 if  street param is empty', async () => {
        const validationComposite = makeCreateHospitalControllerValidation();
        const createHospitalUseCase = makeCreateHospitalUseCase();
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const response = await sut.handle({
            name: 'any_name',
            address: {
                street: '',
                number: 0,
                city: 'any_city',
                state: 'any_state',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toContainEqual({
            error: 'MissingParamError',
            message: 'Missing param: street',
        });

    });

    it('Should be able to return 400 if  street and name param is empty', async () => {
        const validationComposite = makeCreateHospitalControllerValidation();
        const createHospitalUseCase = makeCreateHospitalUseCase();
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const response = await sut.handle({
            name: '',
            address: {
                street: '',
                number: 0,
                city: 'any_city',
                state: 'any_state',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });



        expect(response.statusCode).toBe(400);
        expect(response.body).toContainEqual({
            error: 'MissingParamError',
            message: 'Missing param: street',
        });

        expect(response.body).toContainEqual({
            error: 'MissingParamError',
            message: 'Missing param: name',
        });

    });

    it('Should be able to return 400 if city param is empty', async () => {
        const validationComposite = makeCreateHospitalControllerValidation();
        const createHospitalUseCase = makeCreateHospitalUseCase();
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const response = await sut.handle({
            name: 'any_name',
            address: {
                street: 'any_street',
                number: 0,
                city: '',
                state: 'any_state',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });



        expect(response.statusCode).toBe(400);
        expect(response.body).toContainEqual({
            error: 'MissingParamError',
            message: 'Missing param: city',
        });


    });

    it('Should be able to return 400 if state param is empty', async () => {
        const validationComposite = makeCreateHospitalControllerValidation();
        const createHospitalUseCase = makeCreateHospitalUseCase();
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const response = await sut.handle({
            name: 'any_name',
            address: {
                street: 'any_street',
                number: 0,
                city: 'any_city',
                state: '',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });



        expect(response.statusCode).toBe(400);
        expect(response.body).toContainEqual({
            error: 'MissingParamError',
            message: 'Missing param: state',
        });


    });

    it('Should be able to return 400 if zipCode param is empty', async () => {
        const validationComposite = makeCreateHospitalControllerValidation();
        const createHospitalUseCase = makeCreateHospitalUseCase();
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const response = await sut.handle({
            name: 'any_name',
            address: {
                street: 'any_street',
                number: 200,
                city: 'any_city',
                state: 'a',
                zipCode: '',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });



        expect(response?.statusCode).toBe(400);
        expect(response?.body).toContainEqual({
            error: 'MissingParamError',
            message: 'Missing param: zipCode',
        });


    });

    it('Should be able to return 400 if zipCode param is invalid', async () => {
        const validationComposite = makeCreateHospitalControllerValidation();
        const createHospitalUseCase = makeCreateHospitalUseCase();
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        const response = await sut.handle({
            name: 'any_name',
            address: {
                street: 'any_street',
                number: 100,
                city: 'any_city',
                state: 'a',
                zipCode: '30514-00',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });

        expect(response?.statusCode).toBe(400);
        expect(response?.body).toContainEqual({
            error: 'InvalidParamError',
            message: 'Invalid param: zipCode',
        });
    });


    it('Should be able return 400 ifhospital name alread exist', async () => {


        const createHospitalUseCase = makeCreateHospitalUseCase();
        const validations: Validation[] = [];
        const validationComposite = new ValidationComposite(validations);
        const sut = new CreateHospitalController(createHospitalUseCase, validationComposite);

        vitest.spyOn(createHospitalUseCase, 'execute')
            .mockRejectedValueOnce(new HospitalAlreadyExistisError());

        const response = await sut.handle({
            name: 'any_name',
            address: {
                street: 'any_street',
                number: 0,
                city: 'any_city',
                state: 'any_state',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({ error: 'Hospital já cadastrado' });
    });
});