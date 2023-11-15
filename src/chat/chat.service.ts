import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}

    // Function to handle sending and saving a new message
    async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        const message = this.messageRepository.create(createMessageDto);
        await this.messageRepository.save(message);
        return message;
    }

    // Function to retrieve chat history
    async getChatHistory(userId1: number, userId2: number): Promise<Message[]> {
        return this.messageRepository.find({
            where: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 }
            ],
            order: {
                createdAt: 'ASC', // Assuming you have a createdAt field for sorting
            },
        });
    }
}
