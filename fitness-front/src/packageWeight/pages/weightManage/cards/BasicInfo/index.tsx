import React, { useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { Card,KnowLedgeCards } from "@/comp";
import { AtModal, AtModalContent } from "taro-ui";
import { BMIBar } from "../../components";
import styles from "./index.module.scss";

export const BasicInfo = () => {
  const [isBMIVisible, setIsBMIVisible] = useState<boolean>(false);
  const [isMetabolismVisible, setIsMetabolismVisible] =
    useState<boolean>(false);
  return (
    <Card title="基本信息">
      <View className={styles["basic_info"]}>
        <View className="top">
          <Image src="https://img0.baidu.com/it/u=189649806,2789154204&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1672765200&t=993759ab4f6dc10e979a905d56637bca"></Image>
          <Text>追</Text>
        </View>
        <View className="detail">
          <View className="item">
            <Text className="key">身高</Text>
            <Text className="value">172cm</Text>
          </View>
          <View className="item">
            <Text className="key">最新体重</Text>
            <Text className="value">72KG</Text>
          </View>
          <View className="item">
            <Text className="key">年龄</Text>
            <Text className="value">21岁</Text>
          </View>
        </View>
        <View className="bmi_area">
          <View className="left">
            <Text>最新BMI</Text>
            <View
              onClick={() => setIsBMIVisible(true)}
              className="at-icon at-icon-help"
            ></View>
          </View>
          <View className="right">
            <Text className="bmi">24.3</Text>
            <Text className="category">超重</Text>
          </View>
        </View>
        <BMIBar bmi={24.3} />
        <View className="metabolism_area">
          <View className="left">
            <Text>基础代谢</Text>
            <View
              onClick={() => setIsMetabolismVisible(true)}
              className="at-icon at-icon-help"
            ></View>
          </View>
          <View className="right">
            <Text className="metabolism_area">1666</Text>
            <Text>千卡</Text>
          </View>
        </View>
      </View>
      <AtModal isOpened={isBMIVisible} onClose={() => setIsBMIVisible(false)}>
        <AtModalContent>{KnowLedgeCards.BMI}</AtModalContent>
      </AtModal>
      <AtModal
        isOpened={isMetabolismVisible}
        onClose={() => setIsMetabolismVisible(false)}
      >
        <AtModalContent>{KnowLedgeCards.metabolism}</AtModalContent>
      </AtModal>
    </Card>
  );
};
