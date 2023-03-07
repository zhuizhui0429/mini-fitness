/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Food {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 100 })
    @ApiProperty({ description: '食物名称' })
    name: string;
    @Column({ length: 200 })
    @ApiProperty({ description: '食物海报' })
    poster: string;
    /**
     *
     * 100g该食物所包含的热量
     * @type {number}
     * @memberof Food
     */
    @Column()
    @ApiProperty({ description: '100g该食物所包含的热量' })
    heat: number;
    /**
     *
     *100g该食物所包含的蛋白质重量(g)
     * @type {number}
     * @memberof Food
     */
    @Column()
    @ApiProperty({ description: '100g该食物所包含的蛋白质重量' })
    protein: number;
    /**
    *
    *100g该食物所包含的碳水化合物重量(g)
    * @type {number}
    * @memberof Food
    */
    @Column()
    @ApiProperty({ description: '100g该食物所包含的碳水化合物重量' })
    carbs: number;
    /**
     *
     *100g该食物所包含的脂肪重量(g)
     * @type {number}
     * @memberof Food
     */
    @Column()
    @ApiProperty({ description: '100g该食物所包含的脂肪重量' })
    fat: number;
}