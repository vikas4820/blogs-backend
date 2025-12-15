import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/components/user/users.entity';
import { Roles } from 'src/components/user/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Roles,
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService]
})
export class SettingsModule {}
