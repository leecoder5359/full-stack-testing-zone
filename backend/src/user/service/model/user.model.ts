export class UserModel {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}