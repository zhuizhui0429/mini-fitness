import type { MealCardProps } from "@/dietDetail/dietDetail"
import type { singleMeal } from '@/dietDetail/type'

export * from './diet'
export * from './food'
export * from './schedule'

export const BASE_URL = 'http://localhost:3000'

export type ResponseWrapper<T> = {
    success: true,
    message: string,
    data: T
}

export type HeatData = Array<{
    name: "预算热量" | "摄入热量" | "运动消耗",
    value: number
}>;

export async function getOneDayHeat(date?: Date): Promise<HeatData> {
    await sleep(getRandomNum(200, 1000))
    return [{
        name: "摄入热量",
        value: getRandomNum(1000, 2000)
    }, {
        name: "运动消耗",
        value: getRandomNum(1000, 2000)
    }, {
        name: "预算热量",
        value: 2000
    }]
}

const poster = 'https://img0.baidu.com/it/u=2459675856,2765862684&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1673456400&t=c1a2cba60b7a8e71b8b0581c635374b5';
type OneDayMealCardsType = Array<Pick<MealCardProps, 'meals' | 'type'>>


// export type AllFoodType =
//     Record<typeof tabs[number], Array<Omit<singleMeal, 'weight'> & { foodId: number }>>
// export async function getAllFood() {
//     await sleep(getRandomNum(200, 1000))
//     const res: AllFoodType = {} as any
//     tabs.forEach(tab => {
//         const foods: Array<Omit<singleMeal, 'weight'>> = []
//         const num = getRandomNum(3, 10)
//         for (let i = 0; i < num; i++) {
//             foods.push({
//                 poster,
//                 name: '米饭',
//                 heat: getRandomNum(100, 600),
//                 rate: {
//                     protein: Number(Math.random().toFixed(2)),
//                     carbs: Number(Math.random().toFixed(2)),
//                     fat: Number(Math.random().toFixed(2)),
//                 }
//             })
//         }
//         res[tab] = foods
//     })
//     return res
// }









export function sleep(time: number) {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve('')
        }, time)
    }))
}

export function getRandomNum(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min))
}
