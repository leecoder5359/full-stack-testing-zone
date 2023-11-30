import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Inject, Injectable, Logger, LoggerService, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorator/public.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { HeaderUtil } from '../common/util/header.util';
import { Role } from '../user/repository/enum/user.enum';
import { ROLES_KEY } from '../common/decorator/role.decorator';
import { IUserService, USER_SERVICE } from '../user/service/interface/user-service.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        @Inject(USER_SERVICE) private userService: IUserService,
        @Inject(Logger) private logger: LoggerService,
    ) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const http = context.switchToHttp();
        const { url, headers } = http.getRequest<Request>();
        const token = HeaderUtil.getToken(headers['authorization']);
        const decoded = this.jwtService.decode(token);

        if (url !== '/api/auth/refresh' && decoded['tokenType'] === 'refresh') {
            const error = new UnauthorizedException('accessToken is required');
            this.logger.error(error.message, error.stack);
            throw error;
        }

        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (requireRoles) {
            const userId = decoded['sub'];
            return this.userService.checkUserIsAdmin(userId);
        }

        return super.canActivate(context);
    }
}
