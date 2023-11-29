import { Module } from '@nestjs/common';
import { StoreController } from './controller/store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './repository/entity/store.entity';
import { StorePresenterMapper } from './mapper/store.presenter.mapper';
import { StorePersistenceMapper } from './mapper/store.persistence.mapper';
import { STORE_REPOSITORY, StoreRepository } from './repository/store.repository';
import { STORE_SERVICE } from './service/interface/store-service.interface';
import { StoreService } from './service/store.service';

@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    controllers: [StoreController],
    providers: [
        {
            provide: STORE_SERVICE,
            useClass: StoreService,
        },
        {
            provide: STORE_REPOSITORY,
            useClass: StoreRepository,
        },
        StorePresenterMapper,
        StorePersistenceMapper,
    ],
})
export class StoreModule {}
