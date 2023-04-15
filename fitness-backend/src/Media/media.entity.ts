import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Schedule } from '../entities'

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    @ApiProperty({ description: '媒体资源的类型' })
    type: string

    @Column({ length: 150 })
    @ApiProperty({ description: '媒体资源的url地址' })
    url: string

    @Column({ length: 100 })
    @ApiProperty({ description: '媒体资源的文件名称' })
    fileName: string

    @ManyToOne(() => Schedule, schedule => schedule.medias)
    schedule: Schedule
}