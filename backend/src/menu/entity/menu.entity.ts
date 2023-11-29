import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { Store } from '../../store/repository/entity/store.entity';
import { OrderMenu } from '../../order/entity/order-menu.entity';
import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';
import { Review } from '../../review/entity/review.entity';
import { AdditionalMenu } from './additional-menu.entity';

@Entity()
export class Menu extends CommonBigPkEntity {
    @Column()
    name: string;

    @Column({nullable: true})
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

    @OneToMany(() => AdditionalMenu, (additionalMenu) => additionalMenu.menu, { cascade: true })
    additionalMenus: AdditionalMenu[];

    @ManyToOne(() => Store, (store) => store.menus)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @OneToOne(() => OrderMenu, (orderMenu) => orderMenu.menu)
    orderMenu: OrderMenu;

    @OneToMany(() => Review, (review) => review.menu)
    reviews: Review[];
}
