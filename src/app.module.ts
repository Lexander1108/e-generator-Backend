import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { ReviewsModule } from './reviews/reviews.module';
import { validationSchema } from './config/validation.schema';
import configuration from './config/configuration';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
    imports: [
        // Load and parse the .env files and provide ConfigService
        ConfigModule.forRoot({
            isGlobal: true, // Make ConfigModule global
            validationSchema,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', 'static'), // set the static folder
            // You can add more options here if needed
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres', // as an example, could be other database type
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                // synchronize: configService.get<boolean>('database.synchronize'), // Should be false in production
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        AuthModule,
        UsersModule,
        ChatModule,
        ReviewsModule,
        // ... other modules
    ],
})
export class AppModule {}
