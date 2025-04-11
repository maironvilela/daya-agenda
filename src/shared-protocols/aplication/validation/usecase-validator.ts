import { UseCaseValidate } from './usecase-validate';

export abstract class Validator<T = any> {
    protected readonly validations: UseCaseValidate<T>[] = [];


    public addValidations(validator: UseCaseValidate<T>) {
        this.validations.push(validator);
    }

    public async validate(data: T) {
        await Promise.all(this.validations.map(validate => validate.execute(data)));
    }

}