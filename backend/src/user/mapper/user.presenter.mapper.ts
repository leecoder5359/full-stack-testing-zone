import { Injectable } from '@nestjs/common';
import { UserModel } from '../service/model/user.model';
import { FindUserRes } from '../controller/payload/response/find-user.res';

@Injectable()
export class UserPresenterMapper {
    toRes(model: UserModel): FindUserRes {
        const res = new FindUserRes();
        res.id = model.id;
        res.name = model.name;
        res.email = model.email;
        res.role = model.role;
        res.createdAt = model.createdAt;
        res.updatedAt = model.updatedAt;
        res.deletedAt = model.deletedAt;
        return res;
    }
}