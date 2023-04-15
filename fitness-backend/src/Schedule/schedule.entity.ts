import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { User, Media } from '../entities'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    @ApiProperty({ description: '计划标题' })
    title: string

    @Column({ length: 100 })
    @ApiProperty({ description: '计划描述' })
    description: string

    @Column({ length: 150 })
    @ApiProperty({ description: '计划封面图url地址' })
    poster: string

    @ManyToOne(() => User, user => user.schedules)
    creator: User

    @OneToMany(() => Media, media => media.schedule)
    medias: Media[]
}