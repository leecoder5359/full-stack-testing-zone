import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Role } from './enum/user.enum';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findAll(page: number, size: number) {
        return this.userRepository.find({
            skip: (page - 1) * size,
            take: size,
        });
    }

    async findOne(id: number) {
        return 'find user';
    }

    async findOneByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    async checkUserIsAdmin(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        return user.role === Role.Admin;
    }

    async createUser(name: string, email: string, password: string) {
        const user = this.userRepository.create({name, email, password});
        return await this.userRepository.save(user);
    }
}
