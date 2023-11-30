import { UserModel } from '../../service/model/user.model';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
    find(page: number, size: number, sort: string): Promise<UserModel[]>;
    findOneById(id: number): Promise<UserModel>;
    findOneByEmail(email: string): Promise<UserModel>;
    save(name: string, email: string, password: string): Promise<UserModel>;
}