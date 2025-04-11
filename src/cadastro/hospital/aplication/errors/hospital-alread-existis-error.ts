import { ApiError } from '../../../../shared-protocols/aplication/error/api-error';

export class HospitalAlreadyExistisError extends ApiError {
    constructor(statusCode = 400) {
        super(statusCode, 'Hospital já cadastrado');
        this.name = 'HospitalAlreadyExistisError';

    }
}