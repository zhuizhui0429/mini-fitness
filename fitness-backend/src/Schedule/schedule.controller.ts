import { Controller, Post, Body, Query, UseInterceptors, UploadedFile, UploadedFiles, SetMetadata, Get } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ScheduleService } from './schedule.service';
import type { createScheduleParamsType } from './schedule.service';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller()
@ApiTags('schedule')
export class ScheduleController {

    constructor(private readonly scheduleService: ScheduleService) { }

    @Post('/createSchedule')
    @ApiOperation({ description: '新建健身计划' })
    @SetMetadata('successMessage', '新建计划成功')
    @UseInterceptors(FileInterceptor('file'))
    async createSchedule(@UploadedFile() poster: Express.Multer.File & { url: string }, @Body() restInfo: Omit<createScheduleParamsType, 'poster'>) {
        console.log('封面poster', poster)
        console.log('其他info', restInfo)
        const { url } = poster
        const res = await this.scheduleService.createSchedule({ ...restInfo, poster: url })
        return res
    }

    @Get('/getAllSchedule')
    @ApiOperation({ description: '查询某个用户创建的所有健身计划' })
    @SetMetadata('successMessage', '获取所有计划成功')
    @ApiQuery({ name: 'userId', description: '用户id' })
    async getAllSchedule(@Query('userId') userId: number) {
        return await this.scheduleService.getAllSchedule(userId)
    }

    @Post('/addMedia')
    @ApiOperation({ description: '为健身计划上传图片或视频' })
    @SetMetadata('successMessage', '添加媒体成功')
    @UseInterceptors(FilesInterceptor('medias'))
    async addMedia(@UploadedFiles() medias: (Express.Multer.File & { url: string })[], @Body('scheduleId') scheduleId: number) {
        const res = await this.scheduleService.addMedia({
            scheduleId,
            medias: medias.map(({ url, mimetype, originalname }) => ({
                url,
                type: mimetype,
                fileName: originalname
            }))
        })
        return res
    }

    @Get('/getMediasOfSchedule')
    @ApiOperation({ description: '获取某个计划下的所有媒体资源' })
    @SetMetadata('successMessage', '获取计划媒体成功')
    @ApiQuery({ name: 'scheduleId', description: '计划id' })
    async getMediasOfSchedule(@Query('scheduleId') scheduleId: number) {
        return await this.scheduleService.getMediasOfSchedule(scheduleId)
    }
}
