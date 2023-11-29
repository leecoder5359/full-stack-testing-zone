import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { AdditionalMenuOption } from './additional-menu-option.entity';

@Entity()
export class AdditionalMenu {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Menu, (menu) => menu.additionalMenus)
    menu: Menu;

    @Column()
    title: string;

    @OneToMany(() => AdditionalMenuOption, (option) => option.additionalMenu, { cascade: true })
    options: AdditionalMenuOption[];

    @Column()
    required: boolean;

    @Column()
    multiple: boolean;
}