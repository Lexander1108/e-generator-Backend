import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

    @Post('callback')
    async callback(@Req() req: Request) {
        // Passport automatically attaches the user object to the request object after successful authentication
        console.log(req);
        // return this.authService.login(req.user);
        return 'ok';
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        // Implement the signup logic using the UsersService
        // This is just a placeholder for the actual implementation
        return 'Signup feature to be implemented';
    }

    // Example of a route that requires authentication
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        console.log(req);
        // return req.user;
    }

    @Get('google')
    async googleAuth(@Req() req) {
        // Initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    async googleAuthRedirect(@Req() req) {
        // Handles the Google OAuth2 callback
        return this.authService.validateUserFromGoogle(req);
    }
}
