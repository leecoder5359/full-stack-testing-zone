import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdditionalMenu } from './additional-menu.entity';

@Entity()
export class AdditionalMenuOption {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AdditionalMenu, (additionalMenu) => additionalMenu.options)
    additionalMenu: AdditionalMenu;

    @Column()
    title: string;

    @Column()
    price: number;
}