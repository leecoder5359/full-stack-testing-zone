import { Controller, Get, Param } from '@nestjs/common';

@Controller('menu')
export class MenuController {
    constructor() {
    }

    @Get(':id')
    getMenu(@Param() id: number) {

    }

    @Get('/store/:storeId')
    getMenuFromStore(@Param() storeId: number) {

    }
}
