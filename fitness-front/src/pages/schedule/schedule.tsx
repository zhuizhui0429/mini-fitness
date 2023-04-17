import React, { FC, useState, useEffect, useContext } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import styles from "./schedule.module.scss";
import { getAllSchedule } from "@/api";
import { AtIcon } from "taro-ui";
import { globalContext } from "@/context";

const Schedule = () => {
  const { userId } = useContext(globalContext);
  const [schedules, setSchedules] = useState<SchedulePosterProps[]>([]);

  const initSchedule = async () => {
    const res = await getAllSchedule(userId);
    setSchedules(res.data.data);
  };

  useEffect(() => {
    initSchedule();
  }, []);

  useDidShow(() => initSchedule());

  const goToCreateSchedule = () =>
    Taro.navigateTo({
      url: "/pages/createSchedule/createSchedule",
    });
  return (
    <View className={styles["schedule_container"]}>
      <View className="create_schedule">
        <Text className="schedule_num">{`创建计划(${schedules.length}个)`}</Text>
        <AtIcon
          prefixClass="icon"
          onClick={goToCreateSchedule}
          size={26}
          value="tianjia"
        />
      </View>
      {schedules.map((data) => (
        <SchedulePoster key={data.title} {...data} />
      ))}
    </View>
  );
};
export default Schedule;

export interface SchedulePosterProps {
  id: number;
  title: string;
  mediaCount: number;
  poster: string;
}
const SchedulePoster: FC<SchedulePosterProps> = (props) => {
  const { poster, title, mediaCount, id } = props;
  const goToScheduleDetail = () =>
    Taro.navigateTo({
      url: `/pages/scheduleDetail/scheduleDetail?id=${id}`,
    });
  return (
    <View
      className={styles["schedule_poster_container"]}
      onClick={goToScheduleDetail}
    >
      <Image src={poster}></Image>
      <View className="detail">
        <Text className="title">{title}</Text>
        <Text className="mediaNum">{`已记录${mediaCount}个媒体`}</Text>
      </View>
    </View>
  );
};
