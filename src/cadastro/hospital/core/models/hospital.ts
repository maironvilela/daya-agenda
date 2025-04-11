import { Address } from './address';


type CreateHospital = {
    id: string,
    name: string,
    address: Address
}

export class Hospital {
    private id: string;
    private name: string;
    private address: Address;

    private constructor(id: string, name: string, address: Address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }


    public static create(data: CreateHospital) {
        return new Hospital(data.id, data.name, data.address);
    }

    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }

    public getAddress(): Address {
        return this.address;
    }


}