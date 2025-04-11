
export interface CreateHospitalUseCase {
    execute(data: CreateHospitalRequest): Promise<CreateHospitalResponse>
}

export type CreateHospitalRequest = {
    name: string,
    address: Address
};
export type CreateHospitalResponse = {
    id: string;
    name: string;
    addressId: string;
} | null

type Address = {
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
    neighborhood: string;
    complement?: string;

}