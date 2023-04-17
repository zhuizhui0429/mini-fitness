import { useState, useRef, useMemo, useEffect } from "react";
import { View, Image, Text } from "@tarojs/components";
import {
  singleMeal,
  nutritionKindsMap,
} from "../../packageDiet/pages/dietDetail/type";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import styles from "./index.module.scss";

interface MealEditorProps extends Omit<singleMeal, "weight"> {
  /**
   * 编辑器最顶部追加渲染的内容
   */
  topRender?: React.ReactNode;
  initialWeight: number;
  /**
   * 点击保存按钮的回调
   */
  onSave?: (meal: singleMeal) => void;
  /**
   * 点击退出按钮的回调
   */
  onExit?: () => void;
}
const numKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const MealEditor: React.FC<MealEditorProps> = (props) => {
  const {
    name,
    initialWeight,
    rate,
    heat,
    poster,
    onSave,
    onExit,
    topRender = null,
  } = props;
  const [weight, setWeight] = useState<number>(+initialWeight.toFixed(1));
  const isInputDecimal = useRef<boolean>(false);
  const integerClickHandler = (int: number) => {
    let newWeight: number;
    let [integer, decimal = 0] = weight.toString().split(".").map(Number);
    if (isInputDecimal.current && weight < 999) {
      if (decimal === 0) {
        decimal = int;
      }
      newWeight = +`${integer}.${decimal}`;
    } else {
      newWeight = Number(`${weight}${int}.${decimal}`);
      newWeight > 999 && (newWeight = 999);
    }
    setWeight(newWeight);
  };
  // 需要额外监听initialWeight,否则点击新菜品时weight为上次菜品weight
  useEffect(() => {
    setWeight(initialWeight);
  }, [initialWeight]);
  const dotClickHandler = () => (isInputDecimal.current = true);
  const deleteClickHandler = () => {
    let [integer, decimal = 0] = weight.toString().split(".").map(Number);
    if (isInputDecimal.current) {
      if (decimal) {
        decimal = 0;
      } else {
        isInputDecimal.current = false;
      }
    } else if (!isInputDecimal.current && decimal) {
      decimal = 0;
    } else {
      const str = integer.toString();
      integer = +str.slice(0, str.length - 1);
    }
    setWeight(Number(`${integer}.${decimal}`));
  };
  const showWeight = useMemo(
    () =>
      weight === 999
        ? 999
        : String(weight).includes(".")
        ? weight
        : `${weight}.0`,
    [weight]
  );
  return (
    <View className={styles["meal_editor_container"]}>
      {topRender}
      <View className="meal_preview">
        <Image src={poster} />
        <View className="detail">
          <Text className="title">{name}</Text>
          <Text className="heat">{`${heat}千卡 / 100克`}</Text>
        </View>
      </View>
      <View className="nutrition_preview">
        <View>
          <Text>{Math.floor((weight * heat) / 100)}千卡</Text>
          <Text>{weight}克</Text>
        </View>
        {Object.keys(nutritionKindsMap).map((kind) => (
          <View key={kind}>
            <Text>{nutritionKindsMap[kind]}</Text>
            <Text>{Math.floor((weight / 100) * rate[kind])}克</Text>
          </View>
        ))}
      </View>
      <View className="weight">
        <View
          className="container"
          style={{
            width: Taro.pxTransform(showWeight.toString().length * 50),
          }}
        >
          <Text className="value">
            {showWeight}
            <Text className="unit">克</Text>
          </Text>
        </View>
      </View>
      <View className="broad">
        <View className="num_area">
          {numKeys.map((num) => (
            <View onClick={() => integerClickHandler(num)} key={num}>
              {num}
            </View>
          ))}
          <View onClick={dotClickHandler}>.</View>
          <View onClick={() => integerClickHandler(0)}>0</View>
          <View onClick={() => onExit && onExit()}>
            <AtIcon prefixClass="icon" value="shouqijianpan" size={20} />
          </View>
        </View>
        <View className="option_area">
          <View className="delete" onClick={deleteClickHandler}>
            <AtIcon prefixClass="icon" value="huitui" />
          </View>
          <Text
            className="save"
            onClick={() => onSave && onSave({ ...props, weight })}
          >
            保存
          </Text>
        </View>
      </View>
    </View>
  );
};
