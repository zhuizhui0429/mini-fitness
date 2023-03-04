/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useEffect } from "react";
import * as echarts from "../ec-canvas/echarts";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

interface ChartProps {
  width: number | string;
  height: number | string;
  option: Record<string, any>;
  show?: boolean;
  id: string;
  style?: React.CSSProperties;
}
export const Chart: React.FC<ChartProps> = (props) => {
  const { width, height, option, id, show = true, style } = props;
  const initChart = useCallback(
    (canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr, // new
      });
      canvas.setChart(chart);
      chart.setOption(option);
      return chart;
    },
    [option]
  );
  return (
    <View
      style={{
        width: typeof width === "string" ? width : Taro.pxTransform(width),
        height: typeof height === "string" ? height : Taro.pxTransform(height),
        display: show ? "block" : "none",
      }}
    >
      <ec-canvas
        force-use-old-canvas="true"
        id={`${id}-dom`}
        canvas-id={id}
        ec={{ onInit: initChart }}
        style={style}
      ></ec-canvas>
    </View>
  );
};
