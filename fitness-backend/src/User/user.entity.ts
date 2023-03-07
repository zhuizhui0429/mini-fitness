import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { DietRecord } from '../Diet/diet.entity'
@Entity()
export class User {
    @PrimaryColumn({ length: 255 })
    id: string
    @Column({ length: 25 })
    nickname: string
    @Column()
    avatar: string
    @OneToMany(type => DietRecord, record => record.creator)
    dietRecord: DietRecord[]
}