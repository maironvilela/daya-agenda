
export interface FindHospitalByNameRepository {
    findByName(data: findHospitalByNameRequest): Promise<findHospitalByNameResponse>
}

export type findHospitalByNameRequest = {
    name: string
}

export type findHospitalByNameResponse = {
    name: string;
    id: string;
    addressId: string;
} | null
