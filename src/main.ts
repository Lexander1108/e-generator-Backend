import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { EnvSchema } from './config/validation.schema'


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService<EnvSchema> = app.get(ConfigService);
    // console.log(configService.get('database'))

    // Set global prefix for all routes
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    // Set up validation for all incoming client payloads
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // Strip out any properties that do not have decorators
        forbidNonWhitelisted: true, // Throw an error if non-whitelisted values are provided
        transform: true, // Automatically transform payloads to be objects typed according to DTO classes
    }));

    // Set up Swagger Module for API documentation
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Example API')
        .setDescription('The example API description')
        .setVersion('1.0')
        .addTag('example')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

    // Start listening for incoming requests
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
