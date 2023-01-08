/* eslint-disable jsx-quotes */
import React, { memo, ReactElement } from "react";
import { View, Text } from "@tarojs/components";
import { Card } from "../../../../components";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

interface singleKnowledge {
  title: string;
  content: string;
}
interface KnowledgeProps {
  list: Array<singleKnowledge>;
}
const KnowledgeCard: React.FC<KnowledgeProps> = memo((props) => {
  const { list } = props;
  const prefix = (
    <View
      className="at-icon at-icon-star-2"
      style={{ fontSize: Taro.pxTransform(30) }}
    ></View>
  );
  return (
    <View className={styles["knowledge_container"]}>
      {list.map(({ title, content }, index) => (
        <View className="item" key={index}>
          <Card
            style={{ padding: 0 }}
            titleSize={30}
            title={title}
            titlePrefix={prefix}
          >
            <Text>{content}</Text>
          </Card>
        </View>
      ))}
    </View>
  );
});

const BMI: singleKnowledge[] = [
  {
    title: "什么是BMI",
    content: `BMI即体质指数,它的计算公式是BMI= 体重(kg)/身高²(m)。BMI可以间接反映出人体的脂肪组成,是目前国际诊断肥胖最广泛的使用方法和指标.
        BMI的判定标准`,
  },
  {
    title: "BMI的判定标准",
    content: `根据《中国肥胖预防和控制蓝皮书》的体质指数判定标准，BMI < 18.5 为体重过低（消瘦）；BMI在18.5～23.9 为正常体重；BMI在 24.0～27.9 为超重，BMI >=28为肥胖。`,
  },
];

const metabolism: singleKnowledge[] = [
  {
    title: "基础代谢的定义",
    content:
      "基础代谢是维持人体最基本生命活动所必需的能量消耗，WHO/FAO对基础代谢的定义是经过10~ 12h空腹和良好的睡眠、清醒仰卧、恒温条件下(一般为22~26°C)，无任何身体活动和紧张的思维活动，全身肌肉放松时所需的能量消耗。",
  },
  {
    title: "如何计算基础代谢",
    content:
      "基础代谢值的算法是由不同学者通过大量不同的样本数据拟合而成的不同公式，计算出的结果值可能根据参考文献的不同而有所差异。薄荷App使用的是毛德倩等人针对中国人研发的基础能量消耗公式，更符合中国人的体质特征。",
  },
];
export const KnowLedgeCards: Record<"BMI" | "metabolism", ReactElement> = {
  BMI: <KnowledgeCard list={BMI} />,
  metabolism: <KnowledgeCard list={metabolism} />,
};
