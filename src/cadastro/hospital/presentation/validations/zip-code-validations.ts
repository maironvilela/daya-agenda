import { Validation } from '@/shared-protocols/presentation/controllers';
import { InvalidParamError } from '../errors/invalid-params-error';

export class ZipCodeValidation implements Validation {

    constructor(private readonly fieldName: string) { }


    private cepRegex = /\b\d{5}-\d{3}\b/;

    validate(input: any): Error | void {
        const result = this.cepRegex.test(input[this.fieldName]);

        if (!result) {
            return new InvalidParamError(this.fieldName);
        }
    }
}