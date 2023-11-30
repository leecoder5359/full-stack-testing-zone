import { ApiCreatedResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { CommonRes } from '../dto/common.res';
import { PageRes } from '../dto/page.res';

export const ApiGetResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(CommonRes),
                        properties: {
                            data: { $ref: getSchemaPath(model) },
                        },
                    },
                ],
            },
        }),
    );
};

export const ApiPostResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiCreatedResponse({
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(CommonRes),
                        properties: {
                            data: { $ref: getSchemaPath(model) },
                        },
                    },
                ],
            },
        }),
    );
};

export const ApiGetItemsResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(CommonRes),
                        properties: {
                            data: {
                                $ref: getSchemaPath(PageRes),
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(model),
                                        },
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        }),
    );
};

export const ApiBasicResponse = () => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(CommonRes),
                    },
                ],
            },
        }),
    );
};
