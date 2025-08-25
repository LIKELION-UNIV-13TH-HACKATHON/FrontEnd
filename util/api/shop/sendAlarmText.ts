import { http } from "../http";

export type MessageTone = "KIND" | "HUMOR" | "NEAT";

export const sendAlarmText = async (text: string, messageType?: MessageTone) => {
  try {
    const body: any = { message: text };
    if (messageType) body.messageType = messageType;
    const res = await http.post("/messages/suggestions", body);
    const status = res.status ?? 0;
    if (status >= 200 && status < 300) {
      const data = res.data as { message?: string; messageType?: MessageTone } | null;
      return data ?? null;
    }
    return null;
  } catch (error) {
    console.error("sendAlarmText error", error);
    return null;
  }
};
