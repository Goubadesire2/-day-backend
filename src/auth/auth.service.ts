import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {LoginDto} from "./dto/login.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService,) {}

   async login(loginDto: LoginDto) {
    console.log("=== LOGIN START ===");
    console.log("Email reçu :", loginDto.email);

    try {
        console.log("1. Recherche utilisateur...");

        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });

        console.log("2. Résultat Prisma :", !!user);

        if (!user) {
            throw new UnauthorizedException(
                "Email ou mot de passe incorrect",
            );
        }

        console.log("3. Utilisateur trouvé :", user.email);

        console.log("4. Vérification bcrypt...");

        const passwordValid = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        console.log("5. Bcrypt terminé :", passwordValid);

        if (!passwordValid) {
            throw new UnauthorizedException(
                "Email ou mot de passe incorrect",
            );
        }

        console.log("6. Création du JWT...");

        const payload = {
            sub: user.id,
            email: user.email,
        };

        const accessToken = this.jwtService.sign(payload);

        console.log("7. JWT créé");

        return {
            access_Token: accessToken,
        };
    } catch (error) {
        console.error("=== ERREUR LOGIN ===");
        console.error(error);

        throw error;
    }
}
}
