import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const typeormConfig = {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
            type: 'postgres',
            host: configService.get('postgres.host'),
            port: configService.get('postgres.port'),
            database: configService.get('postgres.database'),
            username: configService.get('postgres.username'),
            password: configService.get('postgres.password'),
            autoLoadEntities: true,
            synchronize: false,
        };

        if (configService.get('STAGE') === 'local') {
            obj = Object.assign(obj, {
                logging: true,
                synchronize: true,
            });
        }

        console.log('obj', obj);

        return obj;
    },
    async dataSourceFactory(options) {
        const dataSource = await new DataSource(options).initialize();
        return addTransactionalDataSource(dataSource);
    },
};