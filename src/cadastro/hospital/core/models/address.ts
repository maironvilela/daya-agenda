
type CreateAddress = {
    id: string;
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
    neighborhood: string;


}


export class Address {
    private id: string;
    private street: string;
    private number: number;
    private city: string;
    private state: string;
    private zipCode: string;
    private complement: string;
    private neighborhood: string;

    private constructor(id: string, street: string, number: number, complement: string, neighborhood: string, city: string, state: string, zipCode: string) {
        this.id = id;
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.complement = complement && '';
        this.neighborhood = neighborhood;
    }

    public static create(data: CreateAddress) {
        return new Address(data.id, data.street, data.number, data.complement, data.neighborhood, data.city, data.state, data.zipCode);
    }

    public getId(): string {
        return this.id;
    }


}