import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import SimpleHeader from "@/components/SimpleHeader";
import NotificationBody from "@/components/customer/notification/NotificationBody";

const notification = () => {
  const { userid } = useLocalSearchParams();
  console.log("id : ", userid);
  return (
    <>
      <SimpleHeader title="알림" />
      <NotificationBody />
    </>
  );
};

export default notification;
