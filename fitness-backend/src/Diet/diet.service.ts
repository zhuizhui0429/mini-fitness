import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DietRecord, dietRecordType } from './diet.entity'
import { Food } from '../Food/food.entity'
import { User } from '../User/user.entity'
import { formatDate } from '../utils'
import { getDataSource } from '../db'

export const typeArr = ['breakfast', 'lunch', 'dinner'] as const

@Injectable()
export class DietService {
    dataSource: DataSource
    constructor(
        @InjectRepository(DietRecord) private dietRepository: Repository<DietRecord>,
        @InjectRepository(Food) private foodRepository: Repository<Food>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        getDataSource().then(ds => this.dataSource = ds)
    }
    /**
     * 添加饮食记录
     * @param data 
     * @returns 
     */
    async addDietRecord(data: addDietRecordBodyType) {
        const { creatorId, foodId, type, weight } = data
        const record = await this.dietRepository.save({ type, weight, date: formatDate(new Date()) })
        const connectCreator = this.dataSource.createQueryBuilder()
            .relation(DietRecord, 'creator')
            .of(record)
            .set(creatorId)
        const connectFood = this.dataSource.createQueryBuilder()
            .relation(DietRecord, 'meal')
            .of(record)
            .set(foodId)
        await Promise.all([connectCreator, connectFood])
        record.creator = await this.dataSource.createQueryBuilder().relation(DietRecord, 'creator').of(record).loadOne()
        record.meal = await this.dataSource.createQueryBuilder().relation(DietRecord, 'meal').of(record).loadOne()
        return record
    }
    /**
     * 查询某天的饮食记录
     * @param data 
     * @returns 
     */
    async queryOneDayDiet(data: queryOneDayDietBodyType) {
        const { userId, date } = data
        const diet = await this.dataSource.createQueryBuilder(DietRecord, 'diet')
            .leftJoinAndSelect('diet.creator', 'user')
            .leftJoinAndSelect('diet.meal', 'food')
            .where("user.id = :userId", { userId })
            .andWhere("diet.date = :date", { date: formatDate(new Date(date)) })
            .getMany()
        const res: OneDayDiet = []
        diet.forEach(record => {
            const { type, meal: { poster, heat, carbs, protein, fat, name }, weight, id } = record
            const meal = {
                id,
                name,
                poster,
                weight,
                heat,
                rate: {
                    carbs,
                    protein,
                    fat
                }
            }
            const target = res.find(it => it.type === type)
            if (target) {
                //同一用户同一天同一类型的meal进行相同饮食记录的去重即重量叠加
                const sameMeal = target.meals.find(meal => meal.name === name)
                if (sameMeal) {
                    sameMeal.weight += weight
                }
                else {
                    target.meals.push(meal)
                }
            }
            else {
                res.push({
                    type,
                    meals: [meal]
                })
            }
        })
        typeArr.forEach(type => {
            if (diet.find(it => it.type === type)) {
                return
            }
            res.push({ type, meals: [] })
        })
        return res
    }
    /**
     * 更新某一顿中某一菜品的重量
     * @param id 饮食记录的id
     * @param weight 更新后的重量
     */
    async updateDietRecordWeight(data: updateDietRecordWeightQueryType) {
        const { id, weight } = data
        return await this.dataSource.createQueryBuilder()
            .update(DietRecord)
            .set({ weight })
            .where("id = :id", { id })
            .execute()
    }
    /**
     * 删除某条饮食记录id
     * @param recordId 记录id
     * @returns 
     */
    async deleteDietRecord(recordId: number) {
        return await this.dataSource.createQueryBuilder()
            .delete()
            .from(DietRecord)
            .where('id = :id', { id: recordId })
            .execute()
    }

}


export type addDietRecordBodyType = {
    foodId: number,
    creatorId: number,
} & Pick<DietRecord, 'type' | 'weight'>

export type queryOneDayDietBodyType = {
    userId: number,
    date: string
}

export type updateDietRecordWeightQueryType = {
    id: number,
    weight: number
}

export type OneDayDiet = Array<{
    type: dietRecordType,
    meals: Array<Pick<Food, 'poster' | 'name' | 'heat'> & {
        rate: Pick<Food, 'carbs' | 'protein' | 'fat'>,
        weight: number,
        id: number
    }>
}>
