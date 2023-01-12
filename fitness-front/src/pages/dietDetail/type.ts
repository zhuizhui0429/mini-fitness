export enum mealKinds {
    breakfast = "早餐",
    lunch = "午餐",
    dinner = "晚餐",
    extra = "加餐",
    sport = "运动",
}
export const nutritionKindsMap = {
    protein: "蛋白质",
    carbs: "碳水化合物",
    fat: "脂肪",
};
export type singleMeal = {
    poster: string;
    name: string;
    weight: number;
    /**
     * 该菜品的热量比例,值为100g该食物所含热量
     */
    heat: number;
    /**
     * 该菜品的碳蛋脂含量,实际含量为·rate*weight
     */
    rate: Record<keyof typeof nutritionKindsMap, number>;
};