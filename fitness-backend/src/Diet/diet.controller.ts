import { Controller, Get, Post, Body, Query, SetMetadata } from '@nestjs/common';
import { DietService } from './diet.service'
import { ApiOperation, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { dietRecordType, DietRecord } from './diet.entity'
import { addDietRecordBodyExample, queryOneDayDietBodyExample } from './diet.example'
import type { addDietRecordBodyType, queryOneDayDietBodyType, updateDietRecordWeightQueryType } from './diet.service'

@Controller()
@ApiTags('diet_record')
export class DietController {
    constructor(private readonly DietService: DietService) { }
    @Post('/addDietRecord')
    @ApiOperation({ description: '新增一条饮食记录' })
    @SetMetadata('successMessage', '上传饮食记录成功')
    @ApiBody({ schema: { example: addDietRecordBodyExample } })
    async addDietRecord(@Body() info: addDietRecordBodyType) {
        const res = await this.DietService.addDietRecord(info)
        return res
    }

    @Post('/queryOneDayDiet')
    @ApiOperation({ description: '查询用户某一天的饮食' })
    @SetMetadata('successMessage', '查询饮食记录成功')
    @ApiBody({ schema: { example: queryOneDayDietBodyExample } })
    async queryOneDayDiet(@Body() data: queryOneDayDietBodyType) {
        const res = await this.DietService.queryOneDayDiet(data)
        return res
    }

    @Get('/updateDietRecordWeight')
    @ApiOperation({ description: '更新某一顿中某一菜品的重量' })
    @SetMetadata('successMessage', '更新重量成功')
    @ApiQuery({ name: 'id', description: '待更新记录id' })
    @ApiQuery({ name: 'weight', description: '新的重量' })
    async updateDietRecordWeight(@Query() query: updateDietRecordWeightQueryType) {
        const res = await this.DietService.updateDietRecordWeight(query)
        return res
    }

    @Get('/deleteDietRecord')
    @ApiOperation({ description: '删除某条饮食记录' })
    @SetMetadata('successMessage', '删除成功')
    @ApiQuery({ name: 'id', description: '待删除饮食记录id' })
    async deleteDietRecord(@Query('id') id: number) {
        const res = await this.DietService.deleteDietRecord(id)
        return res
    }

}



