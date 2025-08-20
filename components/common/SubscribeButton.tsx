import React from "react";
import { Pressable, Text } from "react-native";
import EmptyStar from "@/assets/images/emptystar.svg";
import FilledStar from "@/assets/images/filledstar.svg";

type SubscribeButtonProps = {
  isSubscribed: boolean;
  onToggle: () => void;
  size?: number;
};

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  isSubscribed,
  onToggle,
  size = 24,
}) => {
  return (
    <Pressable onPress={onToggle}>
      {isSubscribed ? (
        <FilledStar width={size} height={size} />
      ) : (
        <EmptyStar width={size} height={size} />
      )}
    </Pressable>
  );
};

export default SubscribeButton;
