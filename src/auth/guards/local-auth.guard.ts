import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    // You can override the handleRequest method if you need to customize the error handling
    // handleRequest(err, user, info, context, status) {
    //   if (err || !user) {
    //     throw err || new UnauthorizedException();
    //   }
    //   return user;
    // }
}
