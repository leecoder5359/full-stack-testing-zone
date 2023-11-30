import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { DeliveryStatusEnum } from './delivery-status.enum';
import { User } from '../../user/repository/entity/user.entity';
import { OrderMenu } from './order-menu.entity';
import { Store } from '../../store/repository/entity/store.entity';
import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';

@Entity()
export class Order extends CommonBigPkEntity {
    @Column({ type: 'enum', enum: DeliveryStatusEnum, default: DeliveryStatusEnum.PREPARING })
    status: DeliveryStatusEnum;

    @OneToMany(() => OrderMenu, (OrderMenu) => OrderMenu.order)
    orderMenus: OrderMenu[];

    @ManyToOne(() => Store, (store) => store.orders)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;
}