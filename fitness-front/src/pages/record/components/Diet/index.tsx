import React from "react";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { mealKinds } from "../../../../packageDiet/pages/dietDetail/type";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

const options: Array<Pick<RecordOptionProps, "icon" | "optName">> = [
  {
    icon: "zaocan",
    optName: "breakfast",
  },
  {
    icon: "hanbao",
    optName: "lunch",
  },
  {
    icon: "wancan",
    optName: "dinner",
  },
  {
    icon: "pingguo",
    optName: "extra",
  },
  {
    icon: "yundong-",
    optName: "sport",
  },
];

interface DietProps {
  restHeat: number;
  // 每餐的热量比(已经吃的/目标)
  list: [number, number, number, number];
}
export const Diet: React.FC<DietProps> = (props) => {
  const { restHeat, list } = props;
  const heatBarsRender = Object.values(mealKinds).map((kind, index) => (
    <VerticalProgressBar
      time={kind}
      progress={list[index]}
      key={index}
    ></VerticalProgressBar>
  ));
  const recordOptionsRender = options.map((option, index) => (
    <RecordOption key={index} {...option} hasRecorded></RecordOption>
  ));
  const goToDietDetailPage = () => {
    Taro.navigateTo({
      url: "/packageDiet/pages/dietDetail/dietDetail",
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
  optName: keyof typeof mealKinds;
  icon: string;
  hasRecorded: boolean;
}
const RecordOption: React.FC<RecordOptionProps> = (props) => {
  const { optName, icon, hasRecorded } = props;
  const goToAddPage = () =>
    Taro.navigateTo({
      url: `/packageDiet/pages/add/add?type=${optName}`,
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
        <Text>{mealKinds[optName]}</Text>
      </View>
    </View>
  );
};
