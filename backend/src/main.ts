import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { createLogger } from './lib/createLogger';
import { setupSwagger } from './lib/setup-swagger';
import { setupMiddleware } from './lib/setup-middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: createLogger,
    });

    const configService = app.get(ConfigService);

    Sentry.init({ dsn: configService.get('sentry.dsn') });

    setupSwagger(app, configService);

    setupMiddleware(app);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(`STAGE: ${process.env.STAGE}`);
    Logger.log(`listening on port ${port}`);
}

bootstrap();
