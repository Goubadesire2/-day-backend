import {Body, Controller, Post, UseGuards, Get, Request} from '@nestjs/common';
import {UserService} from "./user.service";
import { ApiTags } from '@nestjs/swagger';
import {CreateUserDto} from "./dto/createUser.dto";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createDto: CreateUserDto){
        return this.userService.create(createDto)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }

}
