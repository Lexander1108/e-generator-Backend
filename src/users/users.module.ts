import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Import TypeOrm module and inject repository for User entity
    ],
    controllers: [UsersController], // Controllers that belong to this module
    providers: [UsersService], // Services (providers) that belong to this module
    exports: [UsersService] // Export UsersService if it's going to be used outside of this module
})
export class UsersModule {}
