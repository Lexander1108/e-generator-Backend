import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {User} from "../users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
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

    async validateOAuthLogin(thirdPartyId: string, provider: string): Promise<User> {
        // Logic to find or create a user based on the OAuth provider's data
        const user = await this.usersRepository.findOne({ where: { thirdPartyId, provider } });

        if (!user) {
            // Create a new user if one doesn't exist
            const newUser = this.usersRepository.create({ thirdPartyId, provider });
            // You might want to add more user details that you receive from the provider
            return await this.usersRepository.save(newUser);
        }

        return user; // Return the found or created user
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // More methods related to authentication can be added here, such as signup, logout, refreshToken, etc.
}
