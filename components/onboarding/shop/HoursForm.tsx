import { View, Text, Pressable, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import DropArrow from "@/assets/images/minidroparrow.svg";

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const Taps = ["월", "화", "수", "목", "금", "토", "일"] as const;
export type HoursDayKey = (typeof Taps)[number];
export type HoursTimeField = "open" | "close";
export type HoursDayTimes = Partial<
  Record<HoursDayKey, { open: Date; close: Date }>
>;
export type HoursValue = { days: HoursDayKey[]; times: HoursDayTimes };

type HoursFormProps = {
  onChange?: (value: HoursValue) => void;
  onValidityChange?: (ok: boolean) => void;
};

const HoursForm: React.FC<HoursFormProps> = ({
  onChange,
  onValidityChange,
}) => {
  const [activeTabs, setActiveTabs] = useState<HoursDayKey[]>([]);

  const [times, setTimes] = useState<HoursDayTimes>({});
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentDay, setCurrentDay] = useState<HoursDayKey | null>(null);
  const [currentField, setCurrentField] = useState<HoursTimeField>("open");
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const formatHM = (d?: Date) =>
    d ? `${pad(d.getHours())} : ${pad(d.getMinutes())}` : "00 : 00";

  const openPicker = (day: HoursDayKey, field: HoursTimeField) => {
    setCurrentDay(day);
    setCurrentField(field);
    const t = times[day]?.[field];
    setTempDate(t ?? new Date());
    setPickerVisible(true);
  };

  const applyTime = () => {
    if (!currentDay) return;
    setTimes((prev) => {
      const prevDay = prev[currentDay] ?? {
        open: new Date(),
        close: new Date(),
      };
      return {
        ...prev,
        [currentDay]: { ...prevDay, [currentField]: tempDate },
      } as HoursDayTimes;
    });
    setPickerVisible(false);
  };

  const toggleTab = (day: HoursDayKey) => {
    if (activeTabs.includes(day)) {
      setActiveTabs(activeTabs.filter((d) => d !== day));
    } else {
      setActiveTabs([...activeTabs, day]);
    }
  };

  React.useEffect(() => {
    const value: HoursValue = { days: activeTabs, times };
    onChange?.(value);
    const ok =
      activeTabs.length >= 1 &&
      activeTabs.every((d) => {
        const t = times[d];
        return !!(t && t.open && t.close);
      });
    onValidityChange?.(ok);
  }, [activeTabs, times]);

  return (
    <View className="py-4">
      <View className="flex-row justify-between mb-4 ">
        {Taps.map((value) => {
          const isActive = activeTabs.includes(value);
          return (
            <Pressable
              key={value}
              onPress={() => toggleTab(value)}
              className={`border h-8 rounded-lg aspect-square items-center justify-center ${
                isActive ? "bg-main border-main" : "border-gray-300"
              }`}
            >
              <Text className={isActive ? "text-white" : "text-gray2"}>
                {value}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View>
        {activeTabs.map((value) => {
          return (
            <View key={value} className=" flex-col space-y-2 pb-4">
              <Text className="text-gray2">{value}요일</Text>
              <View className="flex-row space-x-4">
                <Pressable
                  className="flex-row gap-2 items-center"
                  onPress={() => openPicker(value, "open")}
                >
                  <View className="flex-row border-b border-[#CCCCCC] items-center space-x-2 pb-2">
                    <Text className="text-gray2 text-[16px]">
                      {formatHM(times[value]?.open)}
                    </Text>
                    <DropArrow />
                  </View>
                  <Text className="text-gray2 ">부터</Text>
                </Pressable>
                <Pressable
                  className="flex-row gap-2 items-center"
                  onPress={() => openPicker(value, "close")}
                >
                  <View className="flex-row border-b border-[#CCCCCC] items-center space-x-2 pb-2">
                    <Text className="text-gray2 text-[16px]">
                      {formatHM(times[value]?.close)}
                    </Text>
                    <DropArrow />
                  </View>
                  <Text className="text-gray2 text-[16px]">까지</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
      <Modal
        transparent
        visible={pickerVisible}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View className="flex-1 bg-black/40 items-center justify-end pb-4">
          <View className="bg-white w-[349px] rounded-2xl m-4">
            <Pressable
              onPress={() => setPickerVisible(false)}
              className="self-center w-12 h-1 rounded-full bg-gray-300 my-2"
              hitSlop={30}
            />
            <Text className="text-center text-lg font-semibold my-2">
              시간 설정
            </Text>

            <DateTimePicker
              value={tempDate}
              mode="time"
              display="spinner"
              locale="ko-KR"
              onChange={(_e: any, d?: Date) => {
                if (d) {
                  setTempDate(d);
                }
              }}
            />
            <Pressable
              className="m-4 py-4 bg-main rounded-lg"
              onPress={applyTime}
            >
              <Text className="text-white text-center font-semibold text-[18px]">
                확인
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HoursForm;
