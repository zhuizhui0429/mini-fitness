import React, { FC, useState, useRef, useMemo, useEffect } from "react";
import { View, Text, Image, Video } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import styles from "./index.module.scss";
import { AtIcon, AtModal, AtModalContent, AtImagePicker } from "taro-ui";
import {
  getRandomNum,
  uploadMedias,
  getMediasOfSchedule,
  getOneScheduleInfo,
} from "@/api";
import { KnowledgeCard } from "@/comp";
import type { File } from "taro-ui/types/image-picker";
import type { SchedulePosterProps } from "../schedule/schedule";

export interface ScheduleInfoType
  extends Pick<SchedulePosterProps, "poster" | "title"> {
  description: string;
}

const ScheduleDetail = () => {
  const {
    params: { id: scheduleId },
  } = useRouter();
  const [openAllDesc, setOpenAllDesc] = useState<boolean>(false);
  const [albums, setAlbums] = useState<AlbumByDateProps[]>([]);
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfoType>({} as any);

  useEffect(() => {
    const init = async () => {
      const [albumsRes, scheduleInfoRes] = await Promise.all([
        getMediasOfSchedule(+scheduleId!),
        getOneScheduleInfo(+scheduleId!),
      ]);
      setAlbums(albumsRes.data.data);
      setScheduleInfo(scheduleInfoRes.data.data);
    };
    init();
  }, []);

  const mediaCount = useMemo(() => {
    return {
      image: albums.reduce(
        (acc, cur) => acc + cur.medias.filter((m) => m.type === "image").length,
        0
      ),
      video: albums.reduce(
        (acc, cur) => acc + cur.medias.filter((m) => m.type === "video").length,
        0
      ),
    };
  }, [albums]);

  const content = useMemo(() => {
    if (albums.length) {
      return albums.map((data) => <AlbumByDate key={data.date} {...data} />);
    }
    return (
      <View className="empty">
        <Text className="tip">暂未记录照片或视频，赶快上传吧</Text>
      </View>
    );
  }, [albums]);

  const addMedias = async (files: File[]) => {
    const {
      data: { data },
    } = await uploadMedias(+scheduleId!, files);
    const oldAlbumFirstDate = albums[0]?.date;
    const newAlbumDate = data[0].date;
    const newMedias = data.map(({ type, url }) => ({ type, url }));
    if (oldAlbumFirstDate === newAlbumDate) {
      albums[0].medias = albums[0].medias.concat(newMedias);
    } else {
      albums.unshift({
        date: newAlbumDate,
        medias: newMedias,
      });
    }
    setAlbums([...albums]);
  };

  return (
    <View className={styles["schedule_detail_container"]}>
      <View className="schedule_overview">
        <View className="left">
          <Image src={scheduleInfo.poster} />
        </View>
        <View className="right">
          <Text className="title">{scheduleInfo.title}</Text>
          <View className="createInfo">
            由
            <Image src="https://s1.imagehub.cc/images/2023/04/12/adf26a742f16ad4063de76898c1cb6df.md.jpeg"></Image>
            <Text className="creator">追追_zzx</Text>于
            <Text className="date">2023-04-11</Text>创建
          </View>
          <View className="mediaNum">
            <View className="img">
              <AtIcon prefixClass="icon" size={20} value="tupian1" />
              <Text className="num">{mediaCount.image}</Text>
            </View>
            <View className="video">
              <AtIcon prefixClass="icon" size={20} value="shipinbofang" />
              <Text className="num">{mediaCount.video}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        className="desc"
        onClick={() => {
          setOpenAllDesc(true);
        }}
      >
        {scheduleInfo.description}
      </Text>
      <View className="content">{content}</View>
      <View className="add_media_btn">
        <AtImagePicker count={9} multiple files={[]} onChange={addMedias} />
      </View>
      <AtModal isOpened={openAllDesc} onClose={() => setOpenAllDesc(false)}>
        <AtModalContent>
          <KnowledgeCard
            list={[
              {
                title: "计划概述",
                content: scheduleInfo.description,
              },
            ]}
          />
        </AtModalContent>
      </AtModal>
    </View>
  );
};

export default ScheduleDetail;

export interface AlbumByDateProps {
  date: string;
  medias: Array<{
    type: "image" | "video";
    url: string;
  }>;
}

const AlbumByDate: FC<AlbumByDateProps> = (props) => {
  const { date, medias } = props;
  const amplifyIndex = useRef<number>(
    Math.random() > 0.5
      ? medias.length >= 3
        ? getRandomNum(0, medias.length - 1)
        : -1
      : -1
  );
  const mediaRender = medias.map(({ type, url }, index) => {
    return (
      <View
        {...(index == amplifyIndex.current
          ? { style: { gridColumnStart: "span 2", gridRowStart: "span 2" } }
          : {})}
        className="media_wrapper"
        key={url}
      >
        {type === "image" ? (
          <Image src={url}></Image>
        ) : (
          <Video src={url}></Video>
        )}
      </View>
    );
  });

  return (
    <View className={styles["album_by_date_container"]}>
      <Text className="date">{date}</Text>
      <View className="media_area">{mediaRender}</View>
    </View>
  );
};
