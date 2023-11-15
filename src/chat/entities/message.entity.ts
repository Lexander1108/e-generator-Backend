import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {User} from "../../users/entities/user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @Column()
    senderId: number;

    @Column()
    receiverId: number;

    @ManyToOne(() => User, (user) => user.sentMessages)
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedMessages)
    receiver: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
