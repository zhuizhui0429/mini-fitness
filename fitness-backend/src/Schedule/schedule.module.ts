import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule, User } from '../entities'

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, User])],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
