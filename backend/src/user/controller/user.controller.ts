import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PageReq } from '../../common/payload/page.req';
import { ApiGetItemsResponse, ApiGetResponse } from '../../common/decorator/swagger.decorator';
import { FindUserRes } from './payload/response/find-user.res';
import { Role } from '../repository/enum/user.enum';
import { Roles } from '../../common/decorator/role.decorator';
import { IUserService, USER_SERVICE } from '../service/interface/user-service.interface';
import { UserPresenterMapper } from '../mapper/user.presenter.mapper';
import { CommonRes } from '../../common/payload/common.res';

@ApiTags('User')
@ApiExtraModels(CommonRes, PageReq, PageReq, FindUserRes)
@Controller('api/users')
export class UserController {
    constructor(
        @Inject(USER_SERVICE)
        private userService: IUserService,
        private mapper: UserPresenterMapper
    ) {}

    @ApiBearerAuth()
    @ApiGetItemsResponse(FindUserRes)
    @Roles(Role.Admin)
    @Get()
    async findAll(@Query() { page, size, sort }: PageReq) {
        const models = await this.userService.findAll(page, size, sort);
        const response = models.map((model) => this.mapper.toRes(model));
        return CommonRes.of('모든 유저 조회', response);
    }

    @ApiBearerAuth()
    @ApiGetResponse(FindUserRes)
    @Get(':id')
    async findOne(@Param('id') id: number) {
        const model = await this.userService.findOneById(id);
        return CommonRes.of('id로 유저 조회', this.mapper.toRes(model));
    }
}
