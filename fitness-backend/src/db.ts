import { DataSource } from 'typeorm';
import { DietRecord, Food, User, Media, Schedule } from './entities'


let db = new DataSource({
    type: "mysql",
    synchronize: true,
    database: "mini-fitness",
    entities: [DietRecord, Food, User, Media, Schedule],
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