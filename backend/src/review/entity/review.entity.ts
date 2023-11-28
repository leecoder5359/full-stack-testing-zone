import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Menu } from '../../store/entity/menu.entity';
import { Store } from '../../store/entity/store.entity';
import { RatingEnum } from './rating.enum';

@Entity()
export class Review extends CommonBigPkEntity {
    @Column()
    like: boolean;

    @Column()
    dislike: boolean;

    @Column('enum', {enum: RatingEnum})
    rating: RatingEnum;

    @Column()
    content: string;

    @Column({
        type: 'text',
        array: true,
    })
    image: string[];

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Store, (store) => store.reviews)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @ManyToMany(() => Menu, (menu) => menu.reviews)
    menus: Menu[];
}