import React from "react";
import { View, Text } from "@tarojs/components";
import { Card, SmallWeightBar, DateBar } from "@/comp";
import styles from "./index.module.scss";

export const WeightGoal = () => {
  return (
    <View className={styles["weight_goal_container"]}>
      <Card title="体重目标">
        <View className="weight_area">
          <SmallWeightBar current={68} target={60} initial={70} />
        </View>
        <DateBar
          startDate={new Date("2023-03-10")}
          endDate={new Date("2023-06-01")}
        />
        <View className="small_cards">
          <View className="expect">
            <Text>期望减重</Text>
            <Text>10KG</Text>
          </View>
          <View className="time">
            <Text>预计时间</Text>
            <View>
              80<Text> 天</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
