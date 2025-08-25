import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import DropArrow from "../../../assets/images/droparrow.svg";

interface Props {
  data?: number[]; // 외부에서 직접 주입 가능 (우선순위 높음)
  shopId?: number; // 없으면 내부 fetch 생략
}

const SubscribeGraph: React.FC<Props> = ({ data, shopId }) => {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = Math.max(200, screenWidth);

  const [seriesFromApi, setSeriesFromApi] = useState<number[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // 외부 data prop이 있으면 API 호출 불필요
      if (data && data.length === 7) return;
      if (!shopId || shopId === 0) return;
      const { getWeeklySub } = await import(
        "../../../util/api/shop/getWeeklySub"
      );
      const res = await getWeeklySub(shopId);
      if (mounted) setSeriesFromApi(res);
    })();
    return () => {
      mounted = false;
    };
  }, [shopId, data]);

  // 라벨: 최근 7일 (MM/DD), 오늘 포함
  const labels = useMemo(() => {
    const today = new Date();
    const arr: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i); // 오늘 포함
      arr.push(`${d.getMonth() + 1}/${d.getDate()}`);
    }
    return arr;
  }, []);

  const series =
    data && data.length === 7
      ? data
      : seriesFromApi && seriesFromApi.length === 7
      ? seriesFromApi
      : [0, 0, 0, 0, 0, 0, 0];

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
