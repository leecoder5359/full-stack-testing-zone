import { ValidationPipe } from '@nestjs/common';
import { SentryInterceptor } from '../common/interceptor/sentry.interceptor';
import { TransformInterceptor } from '../common/interceptor/transform.interceptor';

export const setupMiddleware = (app) => {
    // ValidationPipe 전역 적용
    app.useGlobalPipes(
        new ValidationPipe({
            // class-transformer 적용
            transform: true,
        }),
    );

    // Intercepter 전역 적용
    app.useGlobalInterceptors(new SentryInterceptor(), new TransformInterceptor());
}