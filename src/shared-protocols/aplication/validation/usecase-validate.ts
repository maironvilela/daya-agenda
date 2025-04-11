export interface UseCaseValidate<T> {
    execute(data: T): Promise<void>
}