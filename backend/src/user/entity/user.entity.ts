import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { RefreshToken } from '../../auth/repository/entity/refresh-token.entity';
import { Role } from '../enum/user.enum';
import { Order } from '../../order/entity/order.entity';
import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';
import { Store } from '../../store/repository/entity/store.entity';
import { Review } from '../../review/entity/review.entity';

@Entity()
export class User extends CommonBigPkEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Role })
    role: Role = Role.User;

    @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
    refreshToken: RefreshToken;

    @OneToMany(() => Store, (store) => store.adminUser)
    stores: Store[];

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}
