import { request } from '@tarojs/taro'
import type { MealCardProps } from "@/dietDetail/dietDetail"
import { sleep, getRandomNum, BASE_URL } from './index'
import type { ResponseWrapper } from './index'


export type OneDayMealCardsType = Array<Pick<MealCardProps, 'meals' | 'type'>>

export type HeatData = Array<{
    name: "预算热量" | "摄入热量" | "运动消耗",
    value: number
}>;

export async function getOneDayMealCardsData(date: string, userId: number) {
    return await request<ResponseWrapper<OneDayMealCardsType>>({
        url: `${BASE_URL}/queryOneDayDiet`,
        method: 'POST',
        data: {
            date,
            userId
        }
    })
}

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

export async function updateDietRecordWeight(recordId: number, weight: number) {
    return await request({
        url: `${BASE_URL}/updateDietRecordWeight`,
        method: 'GET',
        data: {
            id: recordId,
            weight
        }
    })
}

interface addDietRecordReqBody {
    foodId: number,
    creatorId: number,
    type: 'breakfast' | 'lunch' | 'dinner',
    weight: number,
}
export async function addDietRecord(data: addDietRecordReqBody) {
    return await request({
        method: 'POST',
        url: `${BASE_URL}/addDietRecord`,
        data
    })
}

