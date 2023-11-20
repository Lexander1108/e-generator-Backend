import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

import { User } from './src/users/entities/user.entity';
import { Message } from './src/chat/entities/message.entity';
import { Review } from './src/reviews/entities/review.entity';
// const { User } = require('./src/users/entities/user.entity.ts');
// const { Message } = require('./src/chat/entities/message.entity.ts');
// const { DataSource } = require('typeorm');
// const { Review } = require('./src/reviews/entities/review.entity.ts');
const config: DataSourceOptions = {
    type: "postgres", // or other database type
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false, // should be true only in development
    logging: true,
    entities: [User, Message, Review], // Add all your entities here
    subscribers: [],
    migrations: ['src/migration/**/*.ts'],
};

const AppDataSource = new DataSource(config);

console.log(config);

export default AppDataSource;
// module.exports = AppDataSource;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
