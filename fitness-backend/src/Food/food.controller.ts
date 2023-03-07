import { Controller, Get, Post, Body, SetMetadata } from '@nestjs/common';
import { FoodService, updateFoodBodyType } from './food.service'
import { Food } from './food.entity'
import { ApiOperation, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

const updateFoodBodyExample: Food = {
    id: 1,
    name: '青菜',
    poster: 'xxxxx.jpg',
    heat: 255,
    carbs: 10,
    protein: 1,
    fat: 6
}

@Controller()
@ApiTags('food')
export class FoodController {
    constructor(private readonly FoodService: FoodService) { }
    @Get('/allFood')
    getAllFood() {
        return this.FoodService.findAll()
    }

    @ApiOperation({ description: '上传自定义食物' })
    @ApiBody({ type: Food })
    @SetMetadata('successMessage', '添加食物成功')
    @Post('/uploadFood')
    async uploadFoodCategory(@Body() foodInfo: Omit<Food, 'id'>) {
        return await this.FoodService.addFood(foodInfo)
    }

    @Post('/updateFood')
    @ApiOperation({ description: '更新食物信息' })
    @SetMetadata('successMessage', '更新食物成功')
    @ApiBody({ schema: { example: updateFoodBodyExample } })
    async updateFood(@Body() data: updateFoodBodyType & { foodId: number }) {
        const res = await this.FoodService.updateFood(data)
        return res
    }
}

