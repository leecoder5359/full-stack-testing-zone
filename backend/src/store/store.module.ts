import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entity/store.entity';
import { Menu } from './entity/menu.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Store, Menu])],
    controllers: [StoreController],
    providers: [StoreService],
})
export class StoreModule {
}
