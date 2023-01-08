import React, { useEffect } from "react";
import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";

definePageConfig({
  navigationBarTitleText: "添加记录",
});
const SelectFood = () => {
  const router = useRouter();
  console.log("router", router);
  useEffect(() => {}, []);
  console.log("router", router);
  return <View>添加食物或者运动</View>;
};
export default SelectFood;
