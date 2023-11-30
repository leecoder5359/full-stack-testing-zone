import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { IAuthService } from './auth.interface';
import {
    IRefreshTokenRepository,
    REFRESH_TOKEN_REPOSITORY,
} from '../repository/interface/refresh-token-repository.interface';
import { Transactional } from 'typeorm-transactional';
import { SignupModel } from './model/signup.model';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(REFRESH_TOKEN_REPOSITORY)
        private refreshTokenRepository: IRefreshTokenRepository,
    ) {}

    @Transactional()
    async signup(model: SignupModel) {
        const user = await this.userService.findOneByEmail(model.email);
        if (user) throw new BadRequestException();

        model.password = await bcrypt.hash(model.password, 10);
        const createdUser = await this.userService.createUser(model.name, model.email, model.password);
        const userId = createdUser.id;

        const accessToken = this.generateAccessToken(userId);
        const refreshToken = this.generateRefreshToken(userId);

        await this.refreshTokenRepository.save({ id: userId }, refreshToken);

        return { id: userId, accessToken, refreshToken };
    }

    @Transactional()
    async signin(email: string, password: string) {
        const user = await this.validateUser(email, password);

        const refreshToken = this.generateRefreshToken(user.id);
        await this.createRefreshTokenUsingUser(user.id, refreshToken);

        return {
            accessToken: this.generateAccessToken(user.id),
            refreshToken,
        };
    }

    async refresh(token: string, userId: number) {
        const refreshTokenEntity = await this.refreshTokenRepository.findOneByToken(token);
        if (!refreshTokenEntity) throw new BadRequestException();

        const refreshToken = this.generateRefreshToken(userId);
        refreshTokenEntity.token = refreshToken;
        await this.refreshTokenRepository.merge(refreshTokenEntity);

        const accessToken = this.generateAccessToken(userId);
        return { accessToken, refreshToken };
    }

    private generateRefreshToken(userId: number) {
        const payload = { sub: userId, tokenType: 'refresh' };
        return this.jwtService.sign(payload, { expiresIn: '1d' });
    }

    private generateAccessToken(userId: number) {
        const payload = { sub: userId, tokenType: 'access' };
        return this.jwtService.sign(payload, { expiresIn: '1h' });
    }

    private async createRefreshTokenUsingUser(userId: number, refreshToken: string) {
        const refreshTokenEntity = await this.refreshTokenRepository.findOneByUserId(userId);

        if (!refreshToken) {
            await this.refreshTokenRepository.save({ id: userId }, refreshToken);
            return;
        }

        refreshTokenEntity.token = refreshToken;
        await this.refreshTokenRepository.merge(refreshTokenEntity);
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) throw new UnauthorizedException();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException();

        return user;
    }
}
