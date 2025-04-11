import { CreateHospitalUseCase } from '@/cadastro/hospital/core/usecases/create-hospital';
import { ValidationComposite } from '../../validations/validation-composite';
import { badRequest, created, serverError } from '../../helpers/http-helper';
import { ApiError } from '@/shared-protocols/aplication/error/api-error';
import { Controller, HttpResponse } from '@/shared-protocols/presentation/controllers';


export type AddressRequest = {
    street: string,
    number: number,
    city: string,
    state: string,
    zipCode: string,
    complement: string,
    neighborhood: string
}
export type Request = {
    name: string,
    address: AddressRequest
};


export type AddressResponse = {
    id: string,
    street: string,
    number: number,
    city: string,
    state: string,
    zipCode: string,

}
export type Response = {
    id: string,
    name: string,

    address: AddressResponse
}

export class CreateHospitalController implements Controller {

    constructor(
        private readonly createHospitalService: CreateHospitalUseCase,
        private readonly validationComposite: ValidationComposite

    ) { }

    async handle({ name, address }: Request): Promise<HttpResponse> {
        try {
            const errors = this.validationComposite.validate({ name, ...address });

            if (errors.length > 0) {
                return badRequest(errors);
            }

            const hospital = await this.createHospitalService.execute({ name, address });
            return created(hospital);


        } catch (error) {

            if (error instanceof ApiError) {
                return {
                    statusCode: error.getStatusCode(),
                    body: {
                        error: error.message
                    }
                };
            } else {
                return serverError(error);
            }
        };

    }
}
