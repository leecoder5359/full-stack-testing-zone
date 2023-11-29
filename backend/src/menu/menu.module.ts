import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entity/menu.entity';
import { AdditionalMenuOption } from './entity/additional-menu-option.entity';
import { AdditionalMenu } from './entity/additional-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, AdditionalMenuOption, AdditionalMenu])],
  controllers: [MenuController]
})
export class MenuModule {}
