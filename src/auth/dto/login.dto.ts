import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
    @ApiProperty({
        example: "exemple@gmail.com",
        description: "L'email de l'utilisateur"
    })
    @IsEmail({},{message: "L'email est invalide"})
    @IsNotEmpty({message: "L'email est obligatoire"})
    email: string;

    @ApiProperty({
        example: "Motdepasse12345",
        description: "Le mot de passe de l'utilisateur"
    })
    @IsNotEmpty({message: "Le mot de passe est obligatoire"})
    @MinLength(8, {message: "Le mot de passe doit etre au minimum 8 caractères"})
    password: string;
}