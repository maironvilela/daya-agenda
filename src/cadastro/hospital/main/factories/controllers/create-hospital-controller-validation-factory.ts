import { RequiredFieldValidation } from '@/cadastro/hospital/presentation/validations/required-fields-validation';
import { ValidationComposite } from '@/cadastro/hospital/presentation/validations/validation-composite';
import { ZipCodeValidation } from '@/cadastro/hospital/presentation/validations/zip-code-validations';
import { Validation } from '@/shared-protocols/presentation/controllers/validation';


export const makeCreateHospitalControllerValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    const fields = ['name', 'street', 'city', 'state', 'zipCode', 'number', 'neighborhood'];

    for (const field of fields) {
        validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new ZipCodeValidation('zipCode'));

    return new ValidationComposite(validations);





};