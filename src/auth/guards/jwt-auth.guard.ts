import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    // Optionally, you can override the handleRequest method if you need to customize the error handling
    // handleRequest(err, user, info, context, status) {
    //   if (err || !user) {
    //     // You can throw an error here or customize the error handling
    //     throw err || new UnauthorizedException();
    //   }
    //   return user;
    // }
}
