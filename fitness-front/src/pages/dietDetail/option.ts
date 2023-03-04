import type { HeatData } from '@/api'
import Taro from '@tarojs/taro'
import { nutritionKindsMap } from './type'

/**
 * 获取对象类型的所有属性的值类型组成的联合类型
 */
type getObjValueTypes<T extends Record<keyof any, any>, K extends keyof T = keyof T> =
    K extends keyof T ? T[K] : never

export type NutritionDataType = Array<{
    name: getObjValueTypes<typeof nutritionKindsMap>
    value: number
}>

export const getNutritionChartOption = (data: NutritionDataType) => ({
    tooltip: {
        trigger: "none",
    },
    legend: {
        top: "12%",
        right: "5%",
        orient: "vertical",
    },
    series: [
        {
            type: "pie",
            // radius: ["50%", "65%"],
            left: -100,
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: "center",
            },
            emphasis: {
                label: {
                    show: true,
                },
            },
            labelLine: {
                show: false,
            },
            data: data || []
        },
    ],
});


export const getHeatChartOption = (data?: HeatData) => ({
    tooltip: {
        trigger: "item",
        valueFormatter: (val) => `${val}kj`,
        textStyle: {
            fontSize: Taro.pxTransform(24),
        },
        position: 'inside'
    },
    legend: {
        top: "middle",
        left: "5%",
        itemGap: 15,
        orient: "vertical",
    },
    series: [
        {
            type: "pie",
            radius: ["50%", "65%"],
            avoidLabelOverlap: false,
            left: '60',
            label: {
                show: false,
                position: "center",
            },
            emphasis: {
                label: {
                    show: true,
                },
            },
            labelLine: {
                show: false,
            },
            data: data || [],
        },
    ],
});