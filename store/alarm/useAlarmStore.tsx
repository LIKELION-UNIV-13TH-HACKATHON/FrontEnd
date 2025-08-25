import { create } from "zustand";
import { sendAlarmForm } from "@/util/api/shop/sendAlarmFrom";

export type Alarm = {
  contents: string;
  generatedMessage: string[];
  img: string[] | null;
  time: Date | null;
};

type StoreState = {
  alarmInfo: Alarm;
  setAlarm: (data: Alarm) => void;
  updateAlarm: (data: Partial<Alarm>) => void;
  removeAlarm: () => void;
  sendAlarm: (shopId: number) => Promise<boolean>;
};

const initialAlarm: Alarm = {
  contents: "",
  generatedMessage: [],
  img: null,
  time: null,
};

export const useAlarmStore = create<StoreState>((set, get) => ({
  alarmInfo: initialAlarm,

  setAlarm: (data) => set({ alarmInfo: data }),

  updateAlarm: (data) =>
    set((state) => {
      const next = { ...state.alarmInfo, ...data };
      console.log("[updateAlarm]", next); // ✅ 어디서 무엇이 들어오는지 확인
      return { alarmInfo: next };
    }),

  removeAlarm: () => set({ alarmInfo: initialAlarm }),
  sendAlarm: async (shopId: number) => {
    const alarm = get().alarmInfo;
    try {
      console.log("[sendAlarm] payload", alarm, "shopId:", shopId);
      const ok = await sendAlarmForm(
        shopId,
        alarm.contents,
        alarm.img,
        alarm.time
      );
      console.log("[sendAlarm] result", ok);
      return ok;
    } catch (e) {
      console.log("[sendAlarm] error", e);
      return false;
    }
  },
}));
