import { SignupModel } from './model/signup.model';
import { SignupResultModel } from './model/signup-result.model';

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');

export interface IAuthService {
    signup(model: SignupModel): Promise<SignupResultModel>;

    signin(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;

    refresh(token: string, userId: number): Promise<{ accessToken: string; refreshToken: string }>;
}