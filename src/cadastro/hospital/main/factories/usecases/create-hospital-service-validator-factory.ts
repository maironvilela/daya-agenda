import { FindNameHospitalValidator } from '@/cadastro/hospital/aplication/usecases/create-hospital/find-name-hospital-validate';
import { Validator } from '../../../../../shared-protocols/aplication/validation/usecase-validator';
import { FindHospitalByNameRepository } from '@/cadastro/hospital/aplication/infra/repositories';

export class CreateHospitalServiceValidator extends Validator {

    constructor(private findHospitalByNameRepository: FindHospitalByNameRepository) {
        super();
        this.configValidations();
    }


    private configValidations() {
        const findNameHospitalValidator = new FindNameHospitalValidator(this.findHospitalByNameRepository);
        this.addValidations(findNameHospitalValidator);

    }
}