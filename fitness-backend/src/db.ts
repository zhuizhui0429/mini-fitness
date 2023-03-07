import { DataSource } from 'typeorm';
import { DietRecord } from './Diet/diet.entity'
import { Food } from './Food/food.entity'
import { User } from './User/user.entity'

let db = new DataSource({
    type: "mysql",
    synchronize: true,
    database: "mini-fitness",
    entities: [DietRecord, Food, User],
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'zzxcxy666',
})
let dataSource: DataSource = null as any
export const getDataSource = async () => {
    if (!dataSource) {
        dataSource = await db.initialize()
    }
    return dataSource
}