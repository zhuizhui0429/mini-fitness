import type { MealCardProps } from "@/pages/dietDetail/dietDetail"
import type { singleMeal } from '@/pages/dietDetail/type'
import { tabs } from '@/pages/add/config'

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

export async function getOneDayMealCardsData(date?: Date): Promise<OneDayMealCardsType> {
    await sleep(getRandomNum(200, 1000))
    return [
        {
            type: 'breakfast',
            meals: [{
                poster,
                name: '米饭',
                weight: getRandomNum(10, 100),
                heat: getRandomNum(100, 600),
                rate: {
                    protein: Number(Math.random().toFixed(2)),
                    carbs: Number(Math.random().toFixed(2)),
                    fat: Number(Math.random().toFixed(2)),
                }
            }]
        },
        {
            type: 'lunch',
            meals: [{
                poster,
                name: '米饭',
                weight: getRandomNum(10, 100),
                heat: getRandomNum(100, 600),
                rate: {
                    protein: Number(Math.random().toFixed(2)),
                    carbs: Number(Math.random().toFixed(2)),
                    fat: Number(Math.random().toFixed(2)),
                }
            }]
        },
        {
            type: 'dinner',
            meals: [{
                poster,
                name: '米饭',
                weight: getRandomNum(10, 100),
                heat: getRandomNum(100, 600),
                rate: {
                    protein: Number(Math.random().toFixed(2)),
                    carbs: Number(Math.random().toFixed(2)),
                    fat: Number(Math.random().toFixed(2)),
                }
            }]
        }
    ]
}

export type AllFoodType = Record<typeof tabs[number], Array<Omit<singleMeal, 'weight'>>>
export async function getAllFood() {
    await sleep(getRandomNum(200, 1000))
    const res: AllFoodType = {} as any
    tabs.forEach(tab => {
        const foods: Array<Omit<singleMeal, 'weight'>> = []
        const num = getRandomNum(3, 10)
        for (let i = 0; i < num; i++) {
            foods.push({
                poster,
                name: '米饭',
                heat: getRandomNum(100, 600),
                rate: {
                    protein: Number(Math.random().toFixed(2)),
                    carbs: Number(Math.random().toFixed(2)),
                    fat: Number(Math.random().toFixed(2)),
                }
            })
        }
        res[tab] = foods
    })
    return res
}









function sleep(time: number) {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve('')
        }, time)
    }))
}

function getRandomNum(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min))
}
