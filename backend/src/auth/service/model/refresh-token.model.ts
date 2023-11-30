import { UserModel } from '../../../user/service/model/user.model';

export class RefreshTokenModel {
    id: number;
    token: string;
    user: UserModel;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}