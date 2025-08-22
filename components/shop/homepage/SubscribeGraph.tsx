import React, { useMemo } from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import DropArrow from "../../../assets/images/droparrow.svg";

interface Props {
  data?: number[];
}

const SubscribeGraph: React.FC<Props> = ({ data }) => {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = Math.max(200, screenWidth);

  // 라벨: 최근 7일 (MM/DD)
  const labels = useMemo(() => {
    const today = new Date();
    const arr: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i - 1);
      arr.push(`${d.getMonth() + 1}/${d.getDate()}`);
    }
    return arr;
  }, []);

  const series =
    data && data.length === 7 ? data : [12, 14, 13, 15, 16, 18, 20];

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(242, 135, 21, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: "#F28715",
    },
    propsForBackgroundLines: {
      stroke: "#EFEFEF",
    },
    labelColor: () => "#8E8E8E",
  } as const;

  return (
    <View className="p-4">
      <View className="flex-row items-center space-x-1">
        <Text className="font-bold text-base">전체 구독자 수</Text>
        <DropArrow />
      </View>

      <View className="my-2 -ml-10 pt-2">
        <BarChart
          data={{ labels, datasets: [{ data: series }] }}
          width={chartWidth}
          height={160}
          withInnerLines
          yAxisInterval={1}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
          style={{ borderRadius: 12 }}
        />
      </View>
    </View>
  );
};

export default SubscribeGraph;
