import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Schedule, DietRecord } from '../entities'
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    /**
     * 小程序的用户唯一标识id
     */
    @Column({ length: 255 })
    openid: string

    @Column({ length: 25, nullable: true })
    nickname: string

    @Column({ nullable: true })
    avatar: string

    @OneToMany(type => DietRecord, record => record.creator)
    dietRecord: DietRecord[]

    @OneToMany(type => Schedule, schedule => schedule.creator)
    schedules: Schedule[]
}
