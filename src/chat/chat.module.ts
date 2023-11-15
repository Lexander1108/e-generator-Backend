import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]), // If you have a Message entity for storing messages
        UsersModule, // If you need to inject the UserService in ChatGateway or ChatService for user-related operations
    ],
    providers: [
        ChatGateway, // Your WebSocket gateway for handling real-time events
        ChatService, // Service that contains business logic for chat features
    ],
    exports: [
        ChatService, // Exporting ChatService if it's going to be used outside of this module
    ]
})
export class ChatModule {}
