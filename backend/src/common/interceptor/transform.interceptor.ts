import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class TransformInterceptor<T, R> implements NestInterceptor<T, R> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<R> {
        return next.handle().pipe(
            map((response) => {
                const http = context.switchToHttp();
                const request = http.getRequest<Request>();
                const data = response?.data;
                if (Array.isArray(data)) {
                    response.data = this.transformArrayData(data, request);
                }

                return response;
            }),
        );
    }

    private transformArrayData(data: any[], request: Request): any {
        return {
            page: Number(request.query['page'] || 1),
            size: Number(request.query['size'] || 20),
            items: data,
        };
    }
}
