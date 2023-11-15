import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Message} from "../../chat/entities/message.entity";
import {Review} from "../../reviews/entities/review.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    // Relations
    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages: Message[];

    @OneToMany(() => Review, review => review.author)
    reviews: Review[];

    // Additional fields like timestamps can be added here
    // ...
}
