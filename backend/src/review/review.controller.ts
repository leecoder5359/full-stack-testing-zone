import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('review')
export class ReviewController {
    constructor() {
    }

    @Get(':id')
    getReview(@Param() id: number) {

    }

    @Post()
    createReview() {

    }

    @Get('store/:storeId')
    getReviewsFromStore(@Param() storeId: number) {

    }
}
