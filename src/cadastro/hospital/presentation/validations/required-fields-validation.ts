import { Validation } from '@/shared-protocols/presentation/controllers';
import { MissingParamError } from '../errors/missing-param-error';


export class RequiredFieldValidation implements Validation {

    constructor(private readonly fieldName: string) { }

    validate(input: any): Error | void {
        if (!input[this.fieldName]) {
            return new MissingParamError(this.fieldName);
        }
    }
}