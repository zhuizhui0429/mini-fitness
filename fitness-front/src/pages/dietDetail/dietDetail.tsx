import { useState, useEffect, useMemo } from "react";
import { View, Text, Image } from "@tarojs/components";
import { getOneDayHeat, getOneDayMealCardsData } from "@/api";
import { getHeatChartOption, getNutritionChartOption } from "./option";
import type { NutritionDataType } from "./option";
import { Bar, Chart } from "@/comp";
import { AtIcon, AtFloatLayout } from "taro-ui";
import styles from "./dietDetail.module.scss";

definePageConfig({
  navigationBarTitleText: "饮食详情",
  usingComponents: {
    "ec-canvas": "../../ec-canvas/ec-canvas",
  },
});
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
} as const;
const DietDetail = () => {
  const [option, setOption] = useState<ReturnType<typeof getHeatChartOption>>(
    () => getHeatChartOption()
  );
  const [cards, setCards] = useState<MealCardProps[]>([]);
  const [isOpenNutritionChart, setIsOpenNutritionChart] =
    useState<boolean>(false);
  // 点击的卡片类型
  const [cardType, setCardType] = useState<MealCardProps["type"]>("breakfast");
  const renderHeatChart = async () => {
    const data = await getOneDayHeat();
    setOption(getHeatChartOption(data));
  };
  useEffect(() => {
    renderHeatChart();
    const func = async () => {
      const data = await getOneDayMealCardsData();
      setCards(data);
    };
    func();
  }, []);
  const nutritionBars = useMemo(
    () =>
      Object.keys(nutritionKindsMap).map((nutrition) => {
        // 依据mealCards数据计算出三大营养素的各自摄入量
        const intake = Math.floor(
          cards.reduce(
            (acc, card) =>
              acc +
              card.meals.reduce(
                (total, meal) => total + meal.weight * meal.rate[nutrition],
                0
              ),
            0
          )
        );
        return (
          <View className="nutrition_bar" key={nutrition}>
            <Text className="kind">{nutritionKindsMap[nutrition]}</Text>
            <Bar
              width={200}
              initial={0}
              current={intake}
              target={300}
              showTip={false}
              backgroundColor="#ddd"
              bottomChildren={<Text>{intake} / 300 克</Text>}
            />
          </View>
        );
      }),
    [cards]
  );
  const nutritionData: NutritionDataType = useMemo(
    () =>
      Object.entries(nutritionKindsMap).map(([key, name]) => ({
        name,
        value:
          cards
            .find((it) => it.type === cardType)
            ?.meals.reduce(
              (acc, cur) => acc + Math.floor(cur.weight * cur.rate[key]),
              0
            ) || 0,
      })),
    [cards, cardType]
  );
  const nutritionChartOption = useMemo(
    () => getNutritionChartOption(nutritionData),
    [nutritionData]
  );

  const detailRender = useMemo(
    () =>
      nutritionData.map((data) => {
        const total = nutritionData.reduce((acc, cur) => acc + cur.value, 0);
        return (
          <View key={data.name}>
            <Text>{Math.floor((data.value / total) * 100)}%</Text>
            <Text>{data.value}克</Text>
          </View>
        );
      }),
    [nutritionData]
  );
  return (
    <View className={styles["diet_detail_container"]}>
      <View className="diet_total">
        <Chart width="100%" height={400} id="heat_chart" option={option} />
        {nutritionBars}
      </View>
      {cards.map((card) => (
        <MealCard
          key={card.type}
          {...card}
          titleClickHandler={(type) => {
            setCardType(type);
            setIsOpenNutritionChart(true);
          }}
        ></MealCard>
      ))}
      <AtFloatLayout
        isOpened={isOpenNutritionChart}
        title={`${mealKinds[cardType]}营养素分析`}
        onClose={() => setIsOpenNutritionChart(false)}
      >
        <View className="wrapper">
          <Chart
            id="nutrition_chart"
            width={400}
            height={200}
            option={nutritionChartOption}
            show={isOpenNutritionChart}
          />
          <View className="data_details">
            <View className="left">{detailRender}</View>
            <View className="right">
              <Text>
                {cards
                  .find((it) => it.type === cardType)
                  ?.meals.reduce((acc, cur) => acc + cur.heat, 0) || 0}
              </Text>
              <Text>千卡</Text>
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  );
};

export default DietDetail;

export type singleMeal = {
  poster: string;
  name: string;
  weight: number;
  heat: number;
  /**
   * 该菜品的碳蛋脂含量,实际含量为·rate*weight
   */
  rate: Record<keyof typeof nutritionKindsMap, number>;
};
export interface MealCardProps {
  type: keyof typeof mealKinds;
  meals: singleMeal[];
  titleClickHandler?: (cardType: keyof typeof mealKinds) => void;
}

export const MealCard: React.FC<MealCardProps> = (props) => {
  const { type, meals, titleClickHandler } = props;
  if (meals.length === 0) {
    return null;
  }
  return (
    <View className={styles["meal_card_container"]}>
      <View
        className="kind_title"
        onClick={() => titleClickHandler && titleClickHandler(type)}
      >
        <Text className="title">{mealKinds[type]}</Text>
        <Text className="total_heat">
          {`${meals.reduce((acc, cur) => acc + cur.heat, 0)}千卡`}
          <AtIcon prefixClass="icon" value="pingguo" size={14} />
        </Text>
      </View>
      <View className="meals">
        {meals.map(({ name, heat, weight, poster }) => (
          <View className="single_meal" key={name}>
            <View className="left">
              <Image src={poster}></Image>
              <View className="weight">
                <Text>{name}</Text>
                <Text>{weight}克</Text>
              </View>
            </View>
            <View className="right">
              <Text>{heat}千卡</Text>
              <AtIcon prefixClass="icon" value="pingguo" size={14} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
