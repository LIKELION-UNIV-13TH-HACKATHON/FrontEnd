import React, { useEffect, useState } from "react";
import { Modal, View, Pressable, Platform, Text } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  visible: boolean;
  initialDate?: Date;
  onConfirm: (date: Date) => void;
  onClose: () => void;
};

const TimePickerSheet: React.FC<Props> = ({
  visible,
  initialDate,
  onConfirm,
  onClose,
}) => {
  const [tempDate, setTempDate] = useState<Date>(initialDate ?? new Date());

  useEffect(() => {
    if (visible) setTempDate(initialDate ?? new Date());
  }, [visible, initialDate]);

  const onChange = (_e: DateTimePickerEvent, selected?: Date) => {
    if (selected) setTempDate(selected);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      <View className="absolute bottom-0 left-0 right-0 rounded-3xl bg-white p-4 pb-2 shadow-2xl mx-4 mb-8">
        <View className="w-12 h-1 bg-[#CCCCCC] rounded-full self-center mb-5 -mt-2" />
        <Text className="text-[18px] font-semibold text-black text-center mb-4">
          시간 설정
        </Text>
        {Platform.OS === "ios" && (
          <DateTimePicker
            value={tempDate}
            mode="time"
            display="spinner"
            onChange={onChange}
            minuteInterval={1}
            locale="ko-KR"
            is24Hour={false}
          />
        )}
        <Pressable
          className="mt-5 h-14 rounded-2xl bg-[#F18911] items-center justify-center"
          onPress={() => onConfirm(tempDate)}
        >
          <Text className="text-white text-[18px] font-bold">다음</Text>
        </Pressable>
        <View className="h-3" />
      </View>
    </Modal>
  );
};

export default TimePickerSheet;
