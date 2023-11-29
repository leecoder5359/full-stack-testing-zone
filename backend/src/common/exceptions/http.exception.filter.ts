import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonRes } from '../dto/common.res';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(e: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = e.getStatus();
        const request = ctx.getRequest<Request>();

        const data = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        response.status(status).json(new CommonRes(false, e.message, data));
    }
}
