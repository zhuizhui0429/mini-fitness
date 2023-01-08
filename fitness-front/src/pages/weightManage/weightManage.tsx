import React from "react";
import { View } from "@tarojs/components";
import { BasicInfo, WeightGoal, ManageWays } from "./cards";
import styles from "./weightManage.module.scss";

const WeightManage = () => {
  return (
    <View className={styles["weight_manage_container"]}>
      <BasicInfo />
      <WeightGoal />
      <ManageWays />
    </View>
  );
};
export default WeightManage;
