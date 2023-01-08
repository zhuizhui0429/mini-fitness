/* eslint-disable jsx-quotes */
import React, { CSSProperties } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

interface CardProps {
  children: React.ReactNode;
  title: string;
  titleSize?: number;
  titlePrefix?: React.ReactNode;
  /** 给content区域透传style */
  style?: CSSProperties;
}
export const Card: React.FC<CardProps> = (props) => {
  const { children, title, titlePrefix, titleSize = 40, style = {} } = props;
  return (
    <View className={styles["card_container"]}>
      <View className="title_area">
        {titlePrefix || <View className="bar"></View>}
        <View
          className="title"
          style={{ fontSize: Taro.pxTransform(titleSize) }}
        >
          {title}
        </View>
      </View>
      <View className="content" style={style}>
        {children}
      </View>
    </View>
  );
};
