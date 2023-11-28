import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderMenu } from './entity/order-menu.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderMenu])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
