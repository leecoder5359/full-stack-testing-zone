import { Injectable } from '@nestjs/common';
import { UserModel } from '../service/model/user.model';
import { User } from '../repository/entity/user.entity';
import { userTransformer } from '../repository/enum/user.enum';

@Injectable()
export class UserPersistenceMapper {
    toEntity(model: UserModel): User {
        const user = new User();
        user.id = model.id;
        user.name = model.name;
        user.email = model.email;
        user.password = model.password;
        user.role = userTransformer.to(model.role);
        user.createdAt = model.createdAt;
        user.updatedAt = model.updatedAt;
        user.deletedAt = model.deletedAt;
        return user;
    }

    toModel(user: User): UserModel {
        const model = new UserModel();
        model.id = user.id;
        model.name = user.name;
        model.email = user.email;
        model.password = user.password;
        model.role = userTransformer.from(user.role);
        model.createdAt = user.createdAt;
        model.updatedAt = user.updatedAt;
        model.deletedAt = user.deletedAt;
        return model;
    }
}