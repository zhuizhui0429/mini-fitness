/* eslint-disable jsx-quotes */
import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import style from "./index.module.scss";

export default class Index extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className={style["index_container"]}>
        <Text className="red_txt">周志祥</Text>
        <AtButton type="primary">加一</AtButton>
      </View>
    );
  }
}
