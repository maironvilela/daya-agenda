
export interface CreateHospitalRepository {
    create(data: CreateHospitalRequest): Promise<CreateHospitalResponse>;
}

export type CreateHospitalRequest = {
    id: string
    name: string;
    address: Address;
};
export type CreateHospitalResponse = {
    id: string;
    name: string;
    addressId: string;
} | null;

type Address = {
    id: string
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
    neighborhood: string;
    complement?: string;

}