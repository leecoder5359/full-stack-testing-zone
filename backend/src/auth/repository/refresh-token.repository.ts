import { Injectable } from '@nestjs/common';
import { IRefreshTokenRepository } from './interface/refresh-token-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refresh-token.entity';
import { Repository } from 'typeorm';
import { RefreshTokenModel } from '../service/model/refresh-token.model';
import { RefreshTokenPersistenceMapper } from '../mapper/refresh-token.persistence.mapper';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
    constructor(
        @InjectRepository(RefreshToken)
        private repository: Repository<RefreshToken>,
        private mapper: RefreshTokenPersistenceMapper,
    ) {}

    findOneByToken(token: string): Promise<RefreshTokenModel> {
        return this.repository.findOneBy({ token });
    }

    create(user: { id: number }, refreshToken: string): RefreshTokenModel {
        return this.repository.create({ user, token: refreshToken });
    }
    async save(user: { id: number }, token: string): Promise<void> {
        await this.repository.save({ user, token });
    }

    async merge(model: RefreshTokenModel): Promise<RefreshTokenModel> {
        const refreshToken = this.mapper.toEntity(model);
        const entity = await this.repository.save(refreshToken);
        return this.mapper.toModel(entity);
    }

    findOneByUserId(userId: number): Promise<RefreshTokenModel> {
        return this.repository.findOneBy({ user: { id: userId } });
    }
}
