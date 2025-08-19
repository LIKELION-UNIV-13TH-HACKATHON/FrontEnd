import { create } from "zustand";

export type Alarm = {
  contents: string;
  generatedMessage: string[];
  img: string[] | null;
  time: number | null;
};

type StoreState = {
  alarmInfo: Alarm;
  setAlarm: (data: Alarm) => void;
  updateAlarm: (data: Partial<Alarm>) => void;
  removeAlarm: () => void;
};

const initialAlarm: Alarm = {
  contents: "",
  generatedMessage: [],
  img: null,
  time: null,
};

export const useAlarmStore = create<StoreState>((set) => ({
  alarmInfo: initialAlarm,

  setAlarm: (data) => set({ alarmInfo: data }),

  updateAlarm: (data) =>
    set((state) => ({ alarmInfo: { ...state.alarmInfo, ...data } })),

  removeAlarm: () => set({ alarmInfo: initialAlarm }),
}));
