export interface GeneratorUUID {
    generator(): Promise<string>
}