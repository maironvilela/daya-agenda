import { CreateHospitalRepository, CreateHospitalRequest, CreateHospitalResponse } from '@/cadastro/hospital/aplication/infra/repositories/create-hospital-reposoritory';
import { FindHospitalByNameRepository, findHospitalByNameRequest, findHospitalByNameResponse } from '@/cadastro/hospital/aplication/infra/repositories/find-hostpital-by-name-repository';
import { PrismaClient } from '@prisma/client';

export class PrismaHospitalRepository implements FindHospitalByNameRepository, CreateHospitalRepository {

    private prisma = new PrismaClient();

    async create(data: CreateHospitalRequest): Promise<CreateHospitalResponse> {

        await this.prisma.address.create({

            data: {
                id: data.address.id,
                street: data.address.street,
                number: String(data.address.number),
                city: data.address.city,
                state: data.address.state,
                zipCode: data.address.zipCode,
                complement: '',
                neighborhood: 'string',
            }
        });

        const hospital = await this.prisma.hospital.create({

            data: {
                id: data.id,
                name: data.name,
                addressId: data.address.id
            }

        });

        return hospital;

    }

    async findByName({ name }: findHospitalByNameRequest): Promise<findHospitalByNameResponse> {
        const hospital = await this.prisma.hospital.findFirst({
            where: {
                name
            }
        });
        return hospital;
    }

}

