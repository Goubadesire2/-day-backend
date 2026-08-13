import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {LoginDto} from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService,) {}

    async login(loginDto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email
            }
        })

        if(!user){
            throw new UnauthorizedException("Email ou mot de passe incorrect")
        }

        const passwordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        )

        if(!passwordValid){
            throw new UnauthorizedException("Email ou mot de passe incorrect")
        }

        const payload = {
            sub: user.id,
            email: user.email
        }

        const accessToken = this.jwtService.sign(payload)

        return {
            access_Token: accessToken
        }
    }
}
