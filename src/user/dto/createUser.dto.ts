import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{
    @ApiProperty({
        example: "exemple@gamil.com",
        description: "Adresse email de l'utilisateur"
    })
    @IsEmail({},{message: "cet adresse email est invalide"})
    @MaxLength(60,{message: "L'adresse email ne peut contenir au plus 60 caractères"})
    @IsNotEmpty({message: "L'adresse mail est obligatoire"})
    email: string;

    @ApiProperty({
        example: "Motdepasse1234",
        description: "Mot de passe de l'utilisateur"
    })
    @IsNotEmpty({message: "Le mot de passe est obligatoire"})
    @MinLength(8, {message: "Le mot de passe doit contenir aumoins 6 caractères"})
    password: string;

    @ApiProperty({
        example: "John Doe",
        description: "Nom de l'utilisateur"
    })
    @IsString({message: "Le nom doit etre des caractères"})
    @MaxLength(50, {message: "Le nom ne peut depasser 50 caractères"})
    @IsNotEmpty({message: "Le nom est obligatoire"})
    name: string;
}