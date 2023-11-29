import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindUserReqDto } from './dto/req.dto';
import { PageReq } from '../common/dto/page.req';
import { ApiGetItemsResponse, ApiGetResponse } from '../common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/res.dto';
import { User, UserAfterAuth } from '../common/decorator/user.decorator';
import { Role } from './enum/user.enum';
import { Roles } from '../common/decorator/role.decorator';

@ApiTags('User')
@ApiExtraModels(FindUserReqDto, PageReq, FindUserResDto)
@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @ApiGetItemsResponse(FindUserResDto)
    @Roles(Role.Admin)
    @Get()
    async findAll(@Query() { page, size }: PageReq): Promise<FindUserResDto[]> {
        const users = await this.userService.findAll(page, size);
        return users.map(({ id, email, createdAt }) => {
            return { id, email, createdAt: createdAt.toISOString() };
        });
    }

    @ApiBearerAuth()
    @ApiGetResponse(FindUserResDto)
    @Get(':id')
    findOne(@Param() { id }: FindUserReqDto) {
        return this.userService.findOne(id);
    }
}
