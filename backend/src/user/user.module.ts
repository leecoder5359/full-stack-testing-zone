import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repository/entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserPersistenceMapper } from './mapper/user.persistence.mapper';
import { USER_SERVICE } from './service/interface/user-service.interface';
import { USER_REPOSITORY } from './repository/interface/user-repository.interface';
import { UserRepository } from './repository/user.repository';
import { UserModel } from './service/model/user.model';
import { UserPresenterMapper } from './mapper/user.presenter.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [{ provide: USER_SERVICE, useClass: UserService }, UserPersistenceMapper],
    controllers: [UserController],
    providers: [
        { provide: USER_SERVICE, useClass: UserService },
        { provide: USER_REPOSITORY, useClass: UserRepository },
        UserPresenterMapper,
        UserPersistenceMapper,
    ],
})
export class UserModule {
}
