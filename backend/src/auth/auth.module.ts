import { Logger, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './repository/entity/refresh-token.entity';
import { AUTH_SERVICE } from './service/auth.interface';
import { RefreshTokenPersistenceMapper } from './mapper/refresh-token.persistence.mapper';
import { REFRESH_TOKEN_REPOSITORY } from './repository/interface/refresh-token-repository.interface';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { AuthPresenterMapper } from './mapper/auth.presenter.mapper';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    global: true,
                    secret: configService.get('jwt.secret'),
                    signOptions: { expiresIn: '1h' },
                };
            },
        }),
        TypeOrmModule.forFeature([RefreshToken]),
    ],
    providers: [
        { provide: AUTH_SERVICE, useClass: AuthService },
        { provide: REFRESH_TOKEN_REPOSITORY, useClass: RefreshTokenRepository },
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        AuthPresenterMapper,
        RefreshTokenPersistenceMapper,
        JwtStrategy,
        Logger,
    ],
    controllers: [AuthController],
    exports: [AUTH_SERVICE],
})
export class AuthModule {}
