import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Image, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { AtTabs, AtTabsPane, AtFloatLayout } from "taro-ui";
import { SearchBar, Button, Popup } from "@nutui/nutui-react-taro";
import { tabList, tabs } from "./config";
import { MealEditor } from "@/comp";
import { singleMeal, mealKinds } from "../dietDetail/type";
import { getAllFood, AllFoodType, addDietRecord } from "@/api";
import { globalContext } from "@/context";
import styles from "./add.module.scss";

definePageConfig({
  navigationBarTitleText: "添加记录",
});
const SelectFood = () => {
  const {
    params: { type },
  } = useRouter();
  const ctx = useContext(globalContext);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [food, setFood] = useState<AllFoodType>(null as any);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const toEditFoodInfo = useRef<singleMeal>({
    rate: {},
  } as any);
  const [weight, setWeight] = useState(100);
  const date = useRef<string>("");
  useEffect(() => {
    const fetchFood = async () => {
      const res = await getAllFood();
      console.log("food", res.data.data);
      setFood(res.data.data);
    };
    fetchFood();
    date.current = `${new Date().getMonth() + 1}月${new Date().getDate()}日`;
  }, []);
  const [searchText, setSearchText] = useState<string>("");
  const [searchPopupVisible, setSearchPopupVisible] = useState<boolean>(false);
  const [showRecord, setShowRecord] = useState<boolean>(true);
  const [matchFood, setMatchFood] = useState<Array<singleMeal>>([]);
  const handleChange = (text: string) => {
    setSearchText(text);
    if (text.length === 0) {
      setShowRecord(true);
      return;
    }
    setShowRecord(false);
    const match = Object.values(food).map((arr) =>
      arr.filter((SingleFood) => SingleFood.name.includes(text))
    );
    setMatchFood(match.flat());
  };
  return (
    <View className={styles.select_food_container}>
      <View className="search_bar_container">
        <SearchBar
          className="search_bar"
          onFocus={() => {
            setSearchPopupVisible(true);
            console.log("聚焦");
          }}
          placeholder="请输入食物名称"
          rightoutIcon={
            <Button size="small" type="info">
              搜索
            </Button>
          }
        ></SearchBar>
      </View>
      <Popup duration={1} visible={searchPopupVisible}>
        <View className="search_area">
          <SearchBar
            className="search_bar"
            value={searchText}
            onChange={handleChange}
            onClear={() => setShowRecord(true)}
            placeholder="请输入食物名称"
            autoFocus
            rightoutIcon={
              <Button
                size="small"
                type="success"
                onClick={() => {
                  setSearchPopupVisible(false);
                  setShowRecord(true);
                }}
              >
                取消
              </Button>
            }
          ></SearchBar>
          {showRecord ? (
            <View className="search_record">
              <Text className="title">搜索记录</Text>
              {["米饭", "鸡蛋", "玉米"].map((foodName) => (
                <View
                  onClick={() => handleChange(foodName)}
                  key={foodName}
                  className="record_item"
                >
                  {foodName}
                </View>
              ))}
            </View>
          ) : matchFood.length > 0 ? (
            <View className="food_wrapper">
              {matchFood.map((singleFood, i) => (
                <SingleFood
                  key={i}
                  {...singleFood}
                  onClick={() => {
                    setIsEdit(true);
                    toEditFoodInfo.current = singleFood;
                  }}
                ></SingleFood>
              ))}
            </View>
          ) : (
            <Text>暂无当前食物的相关信息</Text>
          )}
        </View>
      </Popup>
      <View className="select_area">
        <AtTabs
          current={activeIndex}
          scroll
          tabDirection="vertical"
          tabList={tabList}
          height="100%"
          onClick={(index) => setActiveIndex(index)}
          animated
        >
          {tabs.map((tab, index) => (
            <AtTabsPane
              key={index}
              tabDirection="vertical"
              current={activeIndex}
              index={index}
            >
              <View className="food_wrapper">
                {food ? (
                  food[tab].map((singleFood, i) => (
                    <SingleFood
                      key={i}
                      {...singleFood}
                      onClick={() => {
                        setIsEdit(true);
                        toEditFoodInfo.current = singleFood;
                        console.log("toEditFoodInfo", singleFood);
                      }}
                    ></SingleFood>
                  ))
                ) : (
                  <Text>加载中，请稍后</Text>
                )}
              </View>
            </AtTabsPane>
          ))}
        </AtTabs>
        <AtFloatLayout isOpened={isEdit} onClose={() => setIsEdit(false)}>
          <MealEditor
            {...toEditFoodInfo.current}
            initialWeight={weight}
            onSave={async (selectedFood: singleMeal) => {
              console.log("selectedFood", selectedFood);
              await addDietRecord({
                foodId: selectedFood.id,
                weight: selectedFood.weight,
                creatorId: ctx.userId,
                type: type as any,
              });
              setIsEdit(false);
              Taro.showToast({
                title: "添加成功",
                icon: "success",
                duration: 2000,
              });
            }}
            onExit={() => setWeight(100)}
            topRender={
              <View className="date_info">
                {date.current} - {mealKinds[type as string]}
              </View>
            }
          />
        </AtFloatLayout>
      </View>
    </View>
  );
};
export default SelectFood;

interface SingleFoodPropsType extends Omit<singleMeal, "weight"> {
  onClick?: () => void;
}
const SingleFood: React.FC<SingleFoodPropsType> = (props) => {
  const { name, poster, heat, onClick } = props;
  return (
    <View className={styles.single_food_container} onClick={() => onClick?.()}>
      <View className="left">
        <Image src={poster}></Image>
        <View className="detail">
          <Text className="name">{name}</Text>
          <View>
            <Text className="heat">{heat}</Text>
            千卡/100克
          </View>
        </View>
      </View>
      <View className="green_dot"></View>
    </View>
  );
};
