import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { User } from '../repository/entity/user.entity';
import { Role } from '../repository/enum/user.enum';
import { IUserService } from './interface/user-service.interface';
import { UserModel } from './model/user.model';
import { IUserRepository, USER_REPOSITORY } from '../repository/interface/user-repository.interface';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: IUserRepository,
    ) {
    }

    async findAll(page: number, size: number, sort: string) {
        return await this.userRepository.find(page, size, sort);
    }

    async findOneByEmail(email: string) {
        return this.userRepository.findOneByEmail(email);
    }

    async checkUserIsAdmin(id: number) {
        const user = await this.findOneById(id);
        return user.role === Role.Admin;
    }

    async createUser(name: string, email: string, password: string) {
        return await this.userRepository.save(name, email, password);
    }

    async findOneById(id: number): Promise<UserModel> {
        const userModel = await this.userRepository.findOneById(id);

        if (!userModel) throw new NotFoundException('해당 id의 유저가 존재하지 않습니다.');

        return userModel;
    }
}
