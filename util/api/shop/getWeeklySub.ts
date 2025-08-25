import { http } from "../http";

interface WeeklyItem {
  date: string; // YYYY-MM-DD
  subscriptionCount: number;
}
interface WeeklyResp {
  responses: WeeklyItem[];
}

// YYYY-MM-DD 포맷터
const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const getWeeklySub = async (
  shopId: number
): Promise<number[] | null> => {
  try {
    if (typeof shopId !== "number" || shopId === 0) return null;

    const { data, status } = await http.get<WeeklyResp>(
      `/shops/${shopId}/subscriptions/weekly`
    );
    if (status !== 200 || !data || !Array.isArray(data.responses)) return null;

    const today = new Date();
    const days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(toYMD(d));
    }

    const map = new Map<string, number>();
    for (const item of data.responses) {
      if (!item || typeof item.subscriptionCount !== "number") continue;
      map.set(item.date, item.subscriptionCount);
    }

    return days.map((d) => map.get(d) ?? 0);
  } catch (e) {
    console.log("getWeeklySub error", e);
    return null;
  }
};
