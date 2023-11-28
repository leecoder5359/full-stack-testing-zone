import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './config/postgres.config';
import jwtConfig from './config/jwt.config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import swaggerConfig from './config/swagger.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import sentryConfig from './config/sentry.config';
import emailConfig from './config/email.config';
import { typeormConfig } from './config/typeorm.config';
import { OrderModule } from './order/order.module';
import { StoreModule } from './store/store.module';
import { ReviewModule } from './review/review.module';

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                limit: 10,
                ttl: 60000,
            },
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [postgresConfig, jwtConfig, swaggerConfig, sentryConfig, emailConfig],
        }),
        TypeOrmModule.forRootAsync(typeormConfig),
        AuthModule,
        UserModule,
        HealthModule,
        OrderModule,
        StoreModule,
        ReviewModule,
    ],
    providers: [Logger],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
