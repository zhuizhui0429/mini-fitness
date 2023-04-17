import react, { useState, useContext } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";
import { AtImagePicker } from "taro-ui";
import { Input, TextArea, Button } from "@nutui/nutui-react-taro";
import { uploadFile, showToast, navigateTo } from "@tarojs/taro";
import type { File } from "taro-ui/types/image-picker";
import { BASE_URL } from "@/api";
import { globalContext } from "@/context";

const CreateSchedule = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { userId } = useContext(globalContext);
  const handleSubmit = () => {
    uploadFile({
      url: `${BASE_URL}/createSchedule`,
      filePath: files[0].url,
      name: "file",
      formData: {
        title,
        description,
        userId,
      },
    }).then((res) => {
      showToast({
        title: "新增计划成功！！",
        icon: "success",
        duration: 2000,
      });
      console.log("res", res);
      setTimeout(() => {
        navigateTo({
          url: `/pages/scheduleDetail/scheduleDetail?id=${
            (res.data as any).data.id
          }`,
        });
      }, 2000);
    });
  };
  return (
    <View className={styles["create_schedule_container"]}>
      <View className="poster">
        <Text className="title">上传封面</Text>
        <AtImagePicker
          multiple={false}
          count={1}
          files={files}
          onChange={(fileArr, type, index) => {
            console.log("type", type, "index", index);
            setFiles(fileArr.length === 0 ? [] : [fileArr[fileArr.length - 1]]);
          }}
        />
      </View>
      <Input
        name="scheduleName"
        label="计划名称"
        placeholder="请输入计划名称"
        clearable
        defaultValue={title}
        onChange={(val: string) => setTitle(val)}
      />
      <TextArea
        placeholder="请输入该计划的主要内容"
        limitshow
        maxlength="500"
        defaultValue={description}
        onChange={(val: string) => setDescription(val)}
      />
      <View className="submit">
        <Button type="success" onClick={handleSubmit}>
          新建计划
        </Button>
      </View>
    </View>
  );
};

export default CreateSchedule;
