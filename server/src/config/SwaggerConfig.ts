import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (nestApp: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('EduFlexHub APIs Documentation')
        .setDescription('EduFlexHub APIs description')
        .setVersion('1.0')
        .addTag('app')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('swagger', nestApp, documentFactory);
}
