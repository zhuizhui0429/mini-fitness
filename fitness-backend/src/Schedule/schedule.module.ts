import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule, User, Media } from '../entities';
import { FileModule } from '../fileModule'

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, User,Media]), FileModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
