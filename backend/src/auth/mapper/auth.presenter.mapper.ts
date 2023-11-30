import { SignupModel } from '../service/model/signup.model';
import { SignupReq } from '../controller/payload/request/signup.req';
import { SignupResultModel } from '../service/model/signup-result.model';
import { SignupRes } from '../controller/payload/response/signup.res';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthPresenterMapper {
    signupToModel(req: SignupReq): SignupModel {
        const model = new SignupModel();
        model.name = req.name;
        model.email = req.email;
        model.password = req.password;
        model.passwordConfirm = req.passwordConfirm;
        return model;
    }

    signupToRes(model: SignupResultModel): SignupRes {
        const res = new SignupRes();
        res.id = model.id;
        res.accessToken = model.accessToken;
        res.refreshToken = model.refreshToken;
        return res;
    }
}