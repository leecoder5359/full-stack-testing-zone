import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { StoreCategory } from './store.enum';
import { Menu } from '../../../menu/entity/menu.entity';
import { Order } from '../../../order/entity/order.entity';
import { User } from '../../../user/entity/user.entity';
import { CommonBigPkEntity } from '../../../common/entity/common-big-pk.entity';
import { Review } from '../../../review/entity/review.entity';

@Entity()
export class Store extends CommonBigPkEntity {
    @Column()
    name: string;

    @Column({
        type: 'text',
        array: true,
    })
    images: string[];

    @Column('enum', { enum: StoreCategory })
    category: StoreCategory;

    @Column({ nullable: true })
    reviewCount: number;

    @Column({ nullable: true })
    rating: number;

    @Column()
    deliveryPrice: number;

    @Column()
    minimumOrderPrice: number;

    @OneToMany(() => Menu, (menu) => menu.store)
    menus: Menu[];

    @OneToMany(() => Order, (order) => order.store)
    orders: Order[];

    @OneToMany(() => Review, (review) => review.store)
    reviews: Review[];

    @ManyToOne(() => User, (user) => user.stores)
    @JoinColumn({ name: 'admin_user_id' })
    adminUser: User;
}
