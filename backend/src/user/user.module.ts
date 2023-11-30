import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserPersistenceMapper } from './mapper/user.persistence.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService, UserPersistenceMapper],
    controllers: [UserController],
    providers: [UserService, UserPersistenceMapper],
})
export class UserModule {}
