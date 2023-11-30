import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { UserPersistenceMapper } from '../mapper/user.persistence.mapper';
import { UserModel } from '../service/model/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        private mapper: UserPersistenceMapper,
    ) {}

    async find(page: number, size: number, sort: string): Promise<UserModel[]> {
        const users = await this.repository.find({
            select: ['id', 'name', 'email', 'name', 'role', 'createdAt', 'updatedAt', 'deletedAt'],
            order: {
                id: sort as FindOptionsOrderValue,
            },
            skip: (page - 1) * size,
            take: size,
        });

        if (!users?.length) return [];

        return users.map((user) => this.mapper.toModel(user));
    }

    async findOneById(id: number): Promise<UserModel> {
        const user = await this.repository.findOneBy({ id });

        if (!user) return null;

        return this.mapper.toModel(user);
    }

    async findOneByEmail(email: string): Promise<UserModel> {
        const user = await this.repository.findOneBy({ email });

        if (!user) return null;

        return this.mapper.toModel(user);
    }

    async save(name: string, email: string, password: string): Promise<UserModel> {
        const user = this.repository.create({ name, email, password })
        await this.repository.save(user);
        return this.mapper.toModel(user);
    }
}