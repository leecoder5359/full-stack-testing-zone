import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
    constructor() {
    }

    @Post()
    createOrder() {

    }

    @Get(':id')
    getOrder(@Param() id: number) {

    }

    @Get('history')
    getHistory() {

    }
}
