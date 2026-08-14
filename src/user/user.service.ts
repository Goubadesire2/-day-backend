import {ConflictException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateUserDto} from "./dto/createUser.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto){
        const mailExist = await this.prisma.user.findUnique({
            where: {email: createUserDto.email}
        })

        if(mailExist){
            throw new ConflictException("Cet adresse email est deja utiliser")
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        const user = await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    }
}
