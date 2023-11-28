import { Menu } from '../../store/entity/menu.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';

@Entity()
export class OrderMenu extends CommonBigPkEntity {
    @Column()
    count: number;

    @ManyToOne(() => Order, (order) => order.orderMenus)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @OneToMany(() => Menu, (menu) => menu.orderMenu)
    menus: Menu[];
}
