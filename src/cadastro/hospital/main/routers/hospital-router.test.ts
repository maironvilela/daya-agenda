import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { setupApp } from '@/server/config/app';

let app: any = null;
const prisma = new PrismaClient();

beforeEach(async () => {
    app = setupApp();
    await prisma.$executeRaw`DELETE FROM Hospital`;
    await prisma.$executeRaw`DELETE FROM Address`;
});

afterEach(async () => {
    await prisma.$disconnect();
});



const makeRequest = (() => {
    const name = 'any_hospital_name';
    const address = {
        street: 'any_street',
        number: 1,
        city: 'any_city',
        state: 'any_state',
        zipCode: '30514-000',
        complement: '',
        neighborhood: 'any_neighborhood'
    };

    return {
        name,
        address
    };
});

const requestData = async (data: any) => {
    return await request(app)
        .post('/api/hospital')
        .send(data);
};


describe('HospitalControllerRouter', () => {

    it('Should be able save a hospital record', async () => {

        const requestHospital = makeRequest();
        const response = await requestData(requestHospital);


        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('name', requestHospital.name);
        expect(response.body).toHaveProperty('addressId', expect.any(String));
    });

    it('Should be able to return status code 400 if hospital is already registered', async () => {

        const { name, address } = makeRequest();

        await prisma.address.create({
            data: {
                id: 'any_address_id',
                street: 'any_street',
                number: '1',
                city: 'any_city',
                state: 'any_state',
                zipCode: '30514-000',
                complement: '',
                neighborhood: 'any_neighborhood'
            }
        });
        await prisma.hospital.create({

            data: {
                id: 'any_hospital_id',
                name,
                addressId: 'any_address_id',
            }

        });

        const response = await requestData({ name, address });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({
            error: 'Hospital já cadastrado'
        });

    });

    it('Should be able to return status code 400 if the name parameter is not provided', async () => {
        const { address, name } = makeRequest();

        const requestHospital = {
            name,
            address: {
                ...address,
                name: ''
            }
        };

        const response = await requestData(requestHospital);


        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(1);
        expect(response.body[0]).toEqual({ error: 'MissingParamError', message: 'Missing param: name' });
    });

    it('Should be able to return status code 400 if the street parameter of the address is not provided', async () => {

        const { address, name } = makeRequest();
        const requestHospital = {
            name,
            address: {
                ...address,
                street: ''
            }
        };
        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(1);
        expect(response.body[0]).toEqual({ error: 'MissingParamError', message: 'Missing param: street' });
    });

    it('Should be able to return status code 400 if the number parameter of the address is not provided', async () => {
        const { address, name } = makeRequest();

        const requestHospital = {
            name,
            address: {
                ...address,
                number: ''
            }
        };

        const response = await requestData(requestHospital);

        expect(response.body).lengthOf(1);
        expect(response.statusCode).toEqual(400);
        expect(response.body[0]).toEqual({ error: 'MissingParamError', message: 'Missing param: number' });
    });

    it('Should be able to return status code 400 if the city parameter of the address is not provided', async () => {
        const { address, name } = makeRequest();

        const requestHospital = {
            name,
            address: {
                ...address,
                city: ''
            }
        };

        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(1);
        expect(response.body[0]).toEqual({ error: 'MissingParamError', message: 'Missing param: city' });
    });

    it('Should be able to return status code 400 if the state parameter of the address is not provided', async () => {
        const { address, name } = makeRequest();

        const requestHospital = {
            name,
            address: {
                ...address,
                state: ''
            }
        };

        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(1);
        expect(response.body[0]).toEqual({ error: 'MissingParamError', message: 'Missing param: state' });
    });

    it('Should be able to return status code 400 if the zipCode parameter of the address is not provided', async () => {

        const { address, name } = makeRequest();
        const requestHospital = {
            name,
            address: {
                ...address,
                zipCode: ''
            }
        };
        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(2);
        expect(response.body[0]).toEqual({ error: 'MissingParamError', message: 'Missing param: zipCode' });

    });

    it('Should be able to return status code 400 if the zipCode parameter of the address is invalid', async () => {
        const { address, name } = makeRequest();
        const requestHospital = {
            name,
            address: {
                ...address,
                zipCode: '123456'
            }
        };
        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(1);
        expect(response.body[0]).toEqual({ error: 'InvalidParamError', message: 'Invalid param: zipCode' });
    });

    it('Should be able to return status code 400 if the neighborhood parameter of the address is not provided', async () => {

        const { address, name } = makeRequest();
        const requestHospital = {
            name,
            address: {
                ...address,
                neighborhood: ''
            }
        };
        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(1);
        expect(response.body[0]).toEqual({ error: 'MissingParamError', message: 'Missing param: neighborhood' });
    });

    it('Should be able to return a list with two validation errors', async () => {
        const { address, name } = makeRequest();
        const requestHospital = {
            name,
            address: {
                ...address,
                neighborhood: '',
                street: ''
            }
        };
        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(2);
    });

    it('Should be able to return a list with three validation errors', async () => {

        const { address, name } = makeRequest();
        const requestHospital = {
            name,
            address: {
                ...address,
                neighborhood: '',
                street: '',
                number: ''
            }
        };
        const response = await requestData(requestHospital);

        expect(response.statusCode).toEqual(400);
        expect(response.body).lengthOf(3);
    });

});





