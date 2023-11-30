import { Controller, Post, Body, BadRequestException, Headers, Inject } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiPostResponse } from '../../common/decorator/swagger.decorator';
import { Public } from '../../common/decorator/public.decorator';
import { User, UserAfterAuth } from '../../common/decorator/user.decorator';
import { HeaderUtil } from '../../common/util/header.util';
import { SignupReq } from './payload/request/signup.req';
import { SignupRes } from './payload/response/signup.res';
import { RefreshRes } from './payload/response/refresh.res';
import { SigninRes } from './payload/response/signin.res';
import { SigninReq } from './payload/request/signin.req';
import { AUTH_SERVICE, IAuthService } from '../service/auth.interface';
import { AuthPresenterMapper } from '../mapper/auth.presenter.mapper';
import { SignupResultModel } from '../service/model/signup-result.model';
import { CommonRes } from '../../common/dto/common.res';

@ApiTags('Auth')
@ApiExtraModels(CommonRes, SignupRes, SigninRes, RefreshRes)
@Controller('api/auth')
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE) private authService: IAuthService,
        private mapper: AuthPresenterMapper
    ) {}

    @ApiPostResponse(SignupRes)
    @Public()
    @Post('signup')
    async signup(@Body() signupReq: SignupReq) {
        if (signupReq.password !== signupReq.passwordConfirm) throw new BadRequestException();
        const model = this.mapper.signupToModel(signupReq);
        const result: SignupResultModel = await this.authService.signup(model);
        const response = this.mapper.signupToRes(result);
        return CommonRes.of('회원가입 완료되었습니다.', response);
    }

    @ApiPostResponse(SigninRes)
    @Public()
    @Post('signin')
    async signin(@Body() signinReq: SigninReq) {
        const { email, password } = signinReq;
        const result = await this.authService.signin(email, password);
        return CommonRes.of('로그인이 완료되었습니다.', result);
    }

    @ApiPostResponse(RefreshRes)
    @ApiBearerAuth()
    @Post('refresh')
    async refresh(@Headers('authorization') authorization: string, @User() user: UserAfterAuth) {
        const token = HeaderUtil.getToken(authorization);
        const result = await this.authService.refresh(token, user.id);
        return CommonRes.of('리프레쉬 토큰 발급 완료', result);
    }
}
