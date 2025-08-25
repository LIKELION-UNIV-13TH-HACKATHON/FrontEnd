import { http } from "../http";

export type SendType = "IMMEDIATE" | "SCHEDULED";

export async function sendAlarmForm(
  shopId: number,
  message: string,
  images: string[] | null,
  time: Date | null
): Promise<boolean> {
  const sendType: SendType = time ? "SCHEDULED" : "IMMEDIATE";
  const scheduledAt = time ? new Date(time).toISOString() : undefined;

  const form = new FormData();
  const request = {
    message,
    sendType,
    ...(scheduledAt ? { scheduledAt } : {}),
  };

  // ✅ React Native + Axios 조합에서 JSON part가 octet-stream으로 가는 문제 방지
  form.append("request", {
    string: JSON.stringify(request),
    type: "application/json",
  } as any);

  if (Array.isArray(images)) {
    images.forEach((uri, idx) => {
      if (!uri) return;
      const filename = uri.split("/").pop() || `image_${idx}.jpg`;
      const ext = (filename.split(".").pop() || "jpg").toLowerCase();
      const mime =
        ext === "png"
          ? "image/png"
          : ext === "webp"
          ? "image/webp"
          : "image/jpeg";

      form.append("files", { uri, name: filename, type: mime } as any);
    });
  }

  const res = await http.post<any>(`/notifications/${shopId}`, form);
  console.log("[sendAlarmForm] status", res.status, res.data);
  console.log("[sendAlarmForm] headers", res.config.headers);
  return res.status >= 200 && res.status < 300;
}
