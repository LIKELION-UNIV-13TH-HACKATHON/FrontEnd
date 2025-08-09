import { View, Text, Image } from "react-native";
import React from "react";
import Bell from "../../../assets/images/bell.svg";
import MainIcon from "../../../assets/images/mainicon_maincolor.svg";
import SearchIcon from "../../../assets/images/searchicon.svg";
import Svg, { Rect, Text as SvgText } from "react-native-svg";

type BadgeProps = { count?: number };
const BellStack: React.FC<BadgeProps> = ({ count = 0 }) => {
  const label = count > 99 ? "99+" : String(count);
  return (
    <Svg width={24} height={17} viewBox="0 0 24 17">
      <Rect x={0.3} y={0.5} width={22.8235} height={16} rx={8} fill="#F28715" />
      <Rect
        x={0.5}
        y={0.5}
        width={22.8235}
        height={16}
        rx={8}
        stroke="white"
        strokeWidth={1}
        fill="none"
      />
      <SvgText
        x="50%"
        y="55%"
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={9}
        fontWeight="bold"
        fill="white"
      >
        {label}
      </SvgText>
    </Svg>
  );
};

const HeaderShop = () => {
  return (
    <View className="flex-row p-4 pr-8 justify-between">
      <MainIcon />
      <View className="flex-row space-x-3 items-center">
        <SearchIcon />
        <View className="relative">
          <Bell />
          <View className=" absolute -top-1 -right-3">
            <BellStack count={11} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderShop;
