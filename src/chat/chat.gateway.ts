import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
    cors: {
        origin: '*', // Configure this to match your front-end URL in production
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) {}

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() createMessageDto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ): Promise<void> {
        const message = await this.chatService.sendMessage(createMessageDto);
        this.server.to(message.receiverId.toString()).emit('messageReceived', message);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(
        @MessageBody() room: string,
        @ConnectedSocket() client: Socket,
    ): void {
        client.join(room);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(
        @MessageBody() room: string,
        @ConnectedSocket() client: Socket,
    ): void {
        client.leave(room);
    }

    // Optional: Lifecycle events like connection/disconnection
    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
}
