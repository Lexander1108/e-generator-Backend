import * as Joi from '@hapi/joi';
import 'joi-extract-type';

export const validationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    HOST: Joi.string().default('localhost'),
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    EMAIL_SERVICE: Joi.string(),
    EMAIL_USERNAME: Joi.string(),
    EMAIL_PASSWORD: Joi.string(),
    EXTERNAL_API_KEY: Joi.string(),
    // Add additional environment variables as needed
});

export type EnvSchema = Joi.extractType<typeof validationSchema>;
