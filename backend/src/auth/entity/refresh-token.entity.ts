import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { CommonBigPkEntity } from '../../common/entity/common-big-pk.entity';

@Entity()
export class RefreshToken extends CommonBigPkEntity {
    @Column()
    token: string;

    @OneToOne(() => User, (user) => user.refreshToken)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
