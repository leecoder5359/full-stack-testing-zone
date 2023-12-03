import { RefreshToken } from '../repository/entity/refresh-token.entity';
import { RefreshTokenModel } from '../service/model/refresh-token.model';
import { Injectable } from '@nestjs/common';
import { UserPersistenceMapper } from '../../user/mapper/user.persistence.mapper';

@Injectable()
export class RefreshTokenPersistenceMapper {
    toModel(refreshToken: RefreshToken): RefreshTokenModel {
        const model = new RefreshTokenModel();
        model.id = refreshToken.id;
        model.token = refreshToken.token;
        model.createdAt = refreshToken.createdAt;
        model.updatedAt = refreshToken.updatedAt;
        model.deletedAt = refreshToken.deletedAt;
        return model;
    }

    toEntity(model: RefreshTokenModel): RefreshToken {
        const entity = new RefreshToken();
        entity.id = model.id;
        entity.token = model.token;
        entity.createdAt = model.createdAt;
        entity.updatedAt = model.updatedAt;
        entity.deletedAt = model.deletedAt;
        return entity;
    }
}
