import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../User/user.entity'
import { Food } from '../Food/food.entity'

export type dietRecordType = 'breakfast' | 'lunch' | 'dinner'
@Entity()
export class DietRecord {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    type: dietRecordType
    @Column({ type: 'date' })
    date: string
    @Column()
    weight: number
    @ManyToOne(type => Food)
    meal: Food
    @ManyToOne(type => User, user => user.dietRecord)
    creator: User
}