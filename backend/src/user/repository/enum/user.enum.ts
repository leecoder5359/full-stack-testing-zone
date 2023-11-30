import { ValueTransformer } from 'typeorm';

export enum Role {
    Admin = 'ADMIN',
    User = 'USER',
}

export const userTransformer: ValueTransformer = {
    to(value: string): Role {
        return value as Role;
    },
    from(value: Role): string {
        return value as string;
    },
};