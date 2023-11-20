import {Controller, Post, Body, Req, UseGuards, Get, HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        // Passport automatically attaches the user object to the request object after successful authentication
        console.log(req);
        // return this.authService.login(req.user);
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.signup(createUserDto);
        return { message: 'User successfully registered', user };
    }
    // Example of a route that requires authentication
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        console.log(req);
        // return req.user;
    }
}
