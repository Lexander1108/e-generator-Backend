import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {User} from "../users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateUserFromGoogle(profile: any): Promise<User> {
        // Extract necessary information from the Google profile
        const { email, firstName, lastName } = profile;


        // Check if user already exists in your database
        let user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            // Create a new user if not exists
            user = new User();
            user.email = email;
            user.fullName = firstName + " " + lastName;
            user.id = profile.sub; // Assuming you have a googleId field in your user entity

            console.log("newUserDto" ,user);

            // Save the new user to the database
            await this.userRepository.save(user);
        }

        console.log("foundUserDto", user);
        console.log("profile", profile);

        // Return the user (either found or newly created)
        return user;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // More methods related to authentication can be added here, such as signup, logout, refreshToken, etc.
}
