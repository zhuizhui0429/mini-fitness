/* eslint-disable jsx-quotes */
import React from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { WeightBar } from "../../components";
import { Diet } from "./components";
import styles from "./record.module.scss";

const Record = () => {
  const goToWeightManage = () =>
    Taro.navigateTo({
      url: `/pages/weightManage/weightManage?initial=70&current=68&target=60`,
    });
  return (
    <View>
      <View className={styles["record_container"]}>
        <View className="wrapper">
          <View className="goal_area">
            <View className="left">
              <Text className="goal">我的目标</Text>
              <Text>单位: 公斤</Text>
            </View>
            <View className="right">
              <Text onClick={goToWeightManage}>体重管理方案</Text>
              <Text className="arrow">{">"}</Text>
            </View>
          </View>
          <View className="weight_preview">
            <WeightBar width={600} initial={70} current={68} target={60} />
          </View>
        </View>
        <View className="health_record">
          <Diet restHeat={1733} list={[0.2, 0.5, 0.8, 1]} />
        </View>
      </View>
    </View>
  );
};
export default Record;
