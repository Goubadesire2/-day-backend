import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {PrismaModule} from "../prisma.module";
import {UserModule} from "../user/user.module";
import {ConfigModule} from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '7d'
        }
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
