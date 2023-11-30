import { UserModel } from '../model/user.model';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
    findAll(page: number, size: number, sort: string): Promise<UserModel[]>;
    findOneById(id: number): Promise<UserModel>;
    findOneByEmail(email: string): Promise<UserModel>;
    checkUserIsAdmin(id: number): Promise<boolean>;
    createUser(name: string, email: string, password: string): Promise<UserModel>;
}