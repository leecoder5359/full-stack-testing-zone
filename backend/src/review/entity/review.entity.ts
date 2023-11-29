import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Menu } from '../../menu/entity/menu.entity';
import { Store } from '../../store/repository/entity/store.entity';
import { RatingEnum } from './rating.enum';

@Entity()
export class Review extends CommonBigPkEntity {
    @Column({ nullable: true })
    like: boolean;

    @Column({ nullable: true })
    dislike: boolean;

    @Column('enum', { enum: RatingEnum })
    rating: RatingEnum;

    @Column()
    content: string;

    @Column({
        type: 'text',
        array: true,
    })
    images: string[];

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Store, (store) => store.reviews)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @ManyToOne(() => Menu, (menu) => menu.reviews)
    @JoinColumn({ name: 'menu_id' })
    menu: Menu;
}
