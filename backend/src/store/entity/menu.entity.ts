import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from './store.entity';
import { OrderMenu } from '../../order/entity/order-menu.entity';
import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';
import { Review } from '../../review/entity/review.entity';

@Entity()
export class Menu extends CommonBigPkEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({
        type: 'text',
        array: true,
    })
    images: string[];

    @Column()
    category: string;

    @Column()
    isRecommended: boolean;

    @Column()
    orderCount: number;

    @Column()
    likeCount: number;

    @Column()
    dislikeCount: number;

    @ManyToOne(() => Store, (store) => store.menus)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @ManyToOne(() => OrderMenu, (orderMenu) => orderMenu.menus)
    @JoinColumn({ name: 'order_menu_id' })
    orderMenu: OrderMenu;

    @ManyToMany(() => Review, (review) => review.menus)
    reviews: Review;
}
