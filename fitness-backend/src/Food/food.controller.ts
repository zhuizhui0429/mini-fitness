import { Controller, Get, Post, Body, SetMetadata } from '@nestjs/common';
import { FoodService } from './food.service'
import { Food } from './food.entity'
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

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
}

