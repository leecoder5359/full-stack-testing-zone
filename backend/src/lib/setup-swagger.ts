import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

export const setupSwagger = (app, configService: ConfigService) => {
    const SWAGGER_ENVS = ['local', 'dev', 'prod'];
    const stage = configService.get('STAGE');

    if (SWAGGER_ENVS.includes(stage)) {
        app.use(
            ['/docs', '/docs-json'],
            basicAuth({
                challenge: true,
                users: {
                    [configService.get('swagger.user')]: configService.get('swagger.password'),
                },
            }),
        );

        const config = new DocumentBuilder()
            .setTitle('NestJS project')
            .setDescription('NestJS project API description')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const customOption: SwaggerCustomOptions = {
            swaggerOptions: {
                persistAuthorization: true,
            },
        };

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document, customOption);
    }
};
