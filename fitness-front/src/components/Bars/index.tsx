/* eslint-disable jsx-quotes */
import React, { CSSProperties, useCallback, useMemo } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

interface BarProps {
  initial: number;
  current: number;
  target: number;
  width?: number;
  activeBackGroundColor?: CSSProperties["color"];
  backgroundColor?: CSSProperties["color"];
  showTip?: boolean;
  // 进度提示的内容,值为default为当前进度的百分比
  tipContent?: string;
  // 进度提示区域的背景色
  tipBackgroundColor?: CSSProperties["color"];
  // 透传给进度提示区域的style
  tipStyle?: CSSProperties;
  // 进度条底部的渲染节点, 节点们flex布局撑开整个宽度
  bottomChildren?: React.ReactNode;
}
export const Bar: React.FC<BarProps> = (props) => {
  const {
    initial,
    current,
    target,
    width,
    activeBackGroundColor = "#00d68e",
    backgroundColor = "#b8f4db",
    showTip = true,
    tipContent,
    tipBackgroundColor = "#fff",
    tipStyle = {},
    bottomChildren,
  } = props;
  const progress = useMemo(() => {
    const rate = (initial - current) / (initial - target);
    return Number((rate > 0 ? rate : 0).toFixed(2));
  }, [initial, current, target]);
  return (
    <View
      className={styles["bar_container"]}
      style={{ width: width ? Taro.pxTransform(width) : "100%" }}
    >
      <View className="progress_area">
        <View className="bar_bg" style={{ backgroundColor }}></View>
        <View
          className="bar_real"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: activeBackGroundColor,
          }}
        ></View>
        {showTip && (
          <Text
            className="progress_tip"
            style={Object.assign(tipStyle, {
              left: `${progress * 100}%`,
              backgroundColor: tipBackgroundColor,
            })}
          >
            {tipContent || `${+progress * 100}%`}
          </Text>
        )}
      </View>
      {bottomChildren && <View className="bottom">{bottomChildren}</View>}
    </View>
  );
};

type WeightBarProps = Pick<
  BarProps,
  "current" | "initial" | "target" | "width"
>;
export const WeightBar: React.FC<WeightBarProps> = (props) => {
  const { current, initial, target } = props;
  const stageMap: Map<string, number> = new Map([
    ["初始", initial],
    ["当前", current],
    ["目标", target],
  ]);
  const bottomChildren = Array.from(stageMap.keys()).map((stage) => (
    <View className="bottom_item" key={stage}>
      <View className="value">{stageMap.get(stage)}</View>
      <Text className="stage">{stage}</Text>
    </View>
  ));
  return (
    <View className={styles["weight_bar_container"]}>
      <Bar
        {...props}
        tipStyle={{
          boxShadow: `5px 5px 3px 1px #d9f0e8,
                      -5px -5px 3px 1px #d9f0e8,
                      -5px 5px 3px 1px #d9f0e8,
                      5px -5px 3px 1px #d9f0e8;`,
        }}
        bottomChildren={bottomChildren}
      />
    </View>
  );
};

type SmallWeightBarProps = Pick<
  BarProps,
  "current" | "target" | "initial" | "width"
>;
export const SmallWeightBar: React.FC<SmallWeightBarProps> = (props) => {
  const { initial, target } = props;
  const bottomChildren = [initial, target].map((weight, index) => (
    <Text key={index}>{weight}kg</Text>
  ));
  return (
    <View className={styles["small_weight_bar_container"]}>
      <Bar
        {...props}
        bottomChildren={bottomChildren}
        tipBackgroundColor="#64cafa"
        backgroundColor="#e3f5ff"
        activeBackGroundColor="#e3f5ff"
        tipStyle={{ color: "#fff" }}
      />
    </View>
  );
};

type DateBarProps = {
  startDate: Date;
  endDate: Date;
};
const getDateStr = (date: Date) => {
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDay() + 1;
  return `${year}-${month}-${day}`;
};
export const DateBar: React.FC<DateBarProps> = (props) => {
  const { startDate, endDate } = props;
  const getDay = () =>
    Math.floor((Date.now() - startDate.getTime()) / (24 * 3600 * 1000));
  const bottomChildren = [startDate, endDate].map((date, index) => (
    <Text key={index} style={{ fontSize: Taro.pxTransform(28) }}>
      {getDateStr(date)}
    </Text>
  ));
  return (
    <Bar
      current={Date.now()}
      initial={startDate.getTime()}
      target={endDate.getTime()}
      tipContent={`第${getDay()}天`}
      tipBackgroundColor="#04cb6e"
      backgroundColor="#e3f5ff"
      activeBackGroundColor="#e3f5ff"
      tipStyle={{
        color: "#fff",
        width: Taro.pxTransform(120),
      }}
      bottomChildren={bottomChildren}
    />
  );
};
