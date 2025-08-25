import { View, Text, ScrollView } from "react-native";
import React from "react";
import NotificationItem from "./NotificationItem";
import { getAlarmList } from "@/util/api/customer/getAlarmList";

const NotificationBody = () => {
  const [alarms, setAlarms] = React.useState<any[]>([]);

  React.useEffect(() => {
    const run = async () => {
      try {
        const res = await getAlarmList();
        if (res?.responses) {
          setAlarms(res.responses);
        }
      } catch (e) {
        console.error("getAlarmList failed", e);
      }
    };
    run();
  }, []);

  return (
    <ScrollView className="pt-4">
      {alarms.length === 0 ? (
        <View className="items-center py-8">
          <Text className="text-gray-500">알림이 없습니다</Text>
        </View>
      ) : (
        alarms.map((alarm) => (
          <NotificationItem
            key={alarm.shopId + String(alarm.sentAt)}
            shopId={alarm.shopId}
            shopName={alarm.shopName}
            message={alarm.message}
            sentAt={alarm.sentAt}
          />
        ))
      )}
    </ScrollView>
  );
};

export default NotificationBody;
