import React from "react";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

const eatTimes = ["早", "中", "晚", "加"];
const options: Array<Pick<RecordOptionProps, "icon" | "optName">> = [
  {
    icon: "zaocan",
    optName: "早餐",
  },
  {
    icon: "hanbao",
    optName: "午餐",
  },
  {
    icon: "wancan",
    optName: "晚餐",
  },
  {
    icon: "pingguo",
    optName: "加餐",
  },
  {
    icon: "yundong-",
    optName: "运动",
  },
];

interface DietProps {
  restHeat: number;
  // 每餐的热量比(已经吃的/目标)
  list: [number, number, number, number];
}
export const Diet: React.FC<DietProps> = (props) => {
  const { restHeat, list } = props;
  const heatBarsRender = eatTimes.map((time, index) => (
    <VerticalProgressBar
      time={time}
      progress={list[index]}
      key={index}
    ></VerticalProgressBar>
  ));
  const recordOptionsRender = options.map((option, index) => (
    <RecordOption key={index} {...option} hasRecorded></RecordOption>
  ));
  const goToDietDetailPage = () => {
    console.log("跳转详情");
    Taro.navigateTo({
      url: "/pages/dietDetail/dietDetail",
    });
  };

  return (
    <View className={styles["diet_container"]}>
      <View onClick={goToDietDetailPage}>
        <Text className="title">饮食&运动记录</Text>
        <View className="heat_area">
          <View className="cal">
            还可吃<Text className="value">{restHeat}</Text>千卡
          </View>
          <View className="stage_heat">{heatBarsRender}</View>
        </View>
      </View>
      <View className="options">{recordOptionsRender}</View>
    </View>
  );
};

interface VerticalProgressBarProps {
  progress: number;
  time: string;
}
const VerticalProgressBar: React.FC<VerticalProgressBarProps> = ({
  progress,
  time,
}) => {
  return (
    <View className={styles["vertical_pro_bar_container"]}>
      <View className="bar_wrapper">
        <View
          className="active"
          style={{ height: `${progress * 100}%` }}
        ></View>
      </View>
      <Text>{time}</Text>
    </View>
  );
};

interface RecordOptionProps {
  optName: string;
  icon: string;
  hasRecorded: boolean;
}
const RecordOption: React.FC<RecordOptionProps> = (props) => {
  const { optName, icon, hasRecorded } = props;
  const goToAddPage = () =>
    Taro.navigateTo({
      url: `/pages/add/add?type=${optName}`,
    });
  return (
    <View className={styles["record_option_container"]} onClick={goToAddPage}>
      <AtIcon prefixClass="icon" value={icon} />
      <View className="bottom">
        <AtIcon
          prefixClass="icon"
          value={hasRecorded ? "check_bg_black" : "tianjia"}
          size={12}
        ></AtIcon>
        <Text>{optName}</Text>
      </View>
    </View>
  );
};
