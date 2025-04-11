import { Validation } from '@/shared-protocols/presentation/controllers';


type ErrorListType = {
    error: string,
    message: string
}
export class ValidationComposite implements Validation {

    private errorList: ErrorListType[] = [];

    constructor(private readonly validations: Validation[]) { }

    validate(input: any): Error | any {
        for (const validation of this.validations) {
            const error = validation.validate(input);
            if (error) {
                this.errorList.push({ error: error.name, message: error.message });
            }
        }

        return this.errorList;
    }
}