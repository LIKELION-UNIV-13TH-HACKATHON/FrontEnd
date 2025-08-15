import { View, Text, ScrollView } from "react-native";
import React from "react";
import NotificationItem from "./NotificationItem";

const list = [1, 2, 3, 4, 5];

const NotificationBody = () => {
  return (
    <ScrollView className="pt-4">
      {list.map((item, index) => (
        <NotificationItem key={index} />
      ))}
    </ScrollView>
  );
};

export default NotificationBody;
