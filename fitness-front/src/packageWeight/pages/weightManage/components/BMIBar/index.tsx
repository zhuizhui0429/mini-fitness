/* eslint-disable jsx-quotes */
import React, { CSSProperties, useMemo, memo } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

interface BMIBarProps {
  bmi: number;
  // 整个bar的宽度
  width?: number;
}
const colors: CSSProperties["color"][] = [
  "#ddd",
  "#c5f3d7",
  "#ffdb7e",
  "#ffc269",
];
export const BMIBar: React.FC<BMIBarProps> = memo((props) => {
  const { bmi, width } = props;
  const barsRender = colors.map((color) => (
    <View className="bar" key={color} style={{ backgroundColor: color }}></View>
  ));
  const rate = useMemo(() => {
    const start = 18.5,
      end = 28;
    const progress = Number(((bmi - start) / (end - start)).toFixed(2));
    return progress > 0 ? (progress > 1 ? 1 : progress) : 0;
  }, [bmi]);
  return (
    <View
      className={styles["bmi_container"]}
      style={{ width: width ? Taro.pxTransform(width) : "100%" }}
    >
      <View
        className="tip"
        style={{
          left: `${rate * 100}%`,
        }}
      ></View>
      {barsRender}
    </View>
  );
});
