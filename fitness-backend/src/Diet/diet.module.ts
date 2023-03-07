import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietRecord } from './diet.entity'
import { Food } from '../Food/food.entity'
import { User } from '../User/user.entity'
import { DietController } from './diet.controller'
import { DietService } from './diet.service'

@Module({
    imports: [TypeOrmModule.forFeature([DietRecord, Food, User])],
    providers: [DietService],
    controllers: [DietController],
})
export class DietModule { }
