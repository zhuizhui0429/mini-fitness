import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { getDataSource } from '../db';
import { User, Media, Schedule } from '../entities';
import { formatDate } from '../utils';

@Injectable()
export class ScheduleService {
    dataSource: DataSource
    constructor(
        @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Media) private mediaRepository: Repository<Media>
    ) {
        getDataSource().then(db => this.dataSource = db)
    }

    async createSchedule(data: createScheduleParamsType) {
        const { title, description, poster, userId } = data
        const scheduleEntity = await this.scheduleRepository.save({ title, description, poster })
        await this.dataSource.createQueryBuilder()
            .relation(Schedule, 'creator')
            .of(scheduleEntity)
            .set(userId)
        return scheduleEntity
    }

    async getAllSchedule(userId: number) {
        return await this.dataSource.createQueryBuilder()
            .relation(User, 'schedules')
            .of(userId)
            .loadMany<Schedule>()
    }

    async addMedia(data: addMediaParamsType) {
        const { medias, scheduleId } = data
        const mediaEntities = await this.mediaRepository.save(medias.map(media => ({ ...media, date: formatDate(new Date()) })))
        return await this.dataSource.createQueryBuilder()
            .relation(Schedule, 'medias')
            .of(scheduleId)
            .add(mediaEntities)
    }

    async getMediasOfSchedule(scheduleId: number) {
        const medias = await this.dataSource.getRepository(Media)
            .createQueryBuilder('media')
            .where('media.scheduleId = :scheduleId', { scheduleId })
            .orderBy('media.date', 'DESC')
            .getMany()
        const data: Array<{ date: string, medias: Array<Pick<Media, 'fileName' | 'type' | 'url'>> }> = []
        medias.forEach(({ url, type, fileName, date }) => {
            const target = data.find(it => it.date === date)
            const media = { url, type, fileName }
            if (!target) {
                data.push({
                    date: date,
                    medias: [media]
                })
                return
            }
            target.medias.push(media)
        })
        return data
    }
}

export interface createScheduleParamsType extends Pick<Schedule, 'title' | 'description' | 'poster'> {
    userId: number
}

export interface addMediaParamsType {
    medias: Array<Omit<Media, 'id' | 'schedule' | 'date'>>,
    scheduleId: number
}


