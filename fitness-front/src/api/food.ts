import { BASE_URL, ResponseWrapper } from './index'
import { request } from '@tarojs/taro'
import type { singleMeal } from '@/dietDetail/type'
import { tabs } from '@/add/config'

export type AllFoodType = Record<typeof tabs[number], Array<singleMeal>>

export async function getAllFood() {
    return await request<ResponseWrapper<AllFoodType>>({
        method: 'GET',
        url: `${BASE_URL}/allFood`
    })
}