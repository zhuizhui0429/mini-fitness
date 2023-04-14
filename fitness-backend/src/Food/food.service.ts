import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food, foodKinds } from './food.entity';

type SingleFoodType = Omit<Food, 'protein' | 'carbs' | 'fat' | 'type'> & { rate: Pick<Food, 'carbs' | 'fat' | 'protein'> }

@Injectable()
export class FoodService {
    constructor(
        @InjectRepository(Food)
        private foodRepository: Repository<Food>,
    ) { }

    async findAll() {
        let allFood = await this.foodRepository.find()
        const res: Record<Food['type'], SingleFoodType[]> = {} as any
        foodKinds.forEach(type => {
            res[type] = allFood.filter(food => food.type === type).map(({ id, carbs, fat, poster, protein, name, heat }) => ({
                id,
                poster,
                name,
                heat,
                rate: {
                    carbs,
                    fat,
                    protein
                }
            }))
        })
        return res
    }

    async remove(id: string): Promise<void> {
        await this.foodRepository.delete(id);
    }

    async addFood(food: Omit<Food, 'id'>) {
        const isExist = await this.foodRepository.findOne({ where: { name: food.name } })
        if (isExist) {
            throw new HttpException('当前食物已存在', HttpStatus.FORBIDDEN)
        }
        const entity = this.foodRepository.create(food)
        return await this.foodRepository.save(entity)
    }

    /**
     * 
     * @param data 新的食物数据
     * @returns 
     */
    async updateFood(data: updateFoodBodyType & { foodId: number }) {
        const { foodId } = data
        const entity = await this.foodRepository.findOne({ where: { id: foodId } })
        if (!entity) {
            throw new HttpException('当前食物不存在,请先创建', HttpStatus.FORBIDDEN)
        }
        return await this.foodRepository.save({ ...entity, ...data })
    }
}


export type updateFoodBodyType = Partial<Omit<Food, 'id'>>