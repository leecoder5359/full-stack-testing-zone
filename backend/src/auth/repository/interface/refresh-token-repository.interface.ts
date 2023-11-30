import { RefreshToken } from '../entity/refresh-token.entity';
import { RefreshTokenModel } from '../../service/model/refresh-token.model';

export const REFRESH_TOKEN_REPOSITORY = Symbol('REFRESH_TOKEN_REPOSITORY');

export interface IRefreshTokenRepository {
    save(user: { id: number }, refreshToken: string): Promise<void>;
    merge(refreshToken: RefreshTokenModel): Promise<RefreshTokenModel>;
    create(user: { id: number }, refreshToken: string): RefreshTokenModel;
    findOneByUserId(userId: number): Promise<RefreshTokenModel>;
    findOneByToken(token: string): Promise<RefreshTokenModel>;
}