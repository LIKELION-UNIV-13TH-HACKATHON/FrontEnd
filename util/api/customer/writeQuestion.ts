import { http } from "../http";

export const writeQuestion = async ({
  shopId,
  title,
  question,
}: {
  shopId: number;
  title: string;
  question: string;
}) => {
  try {
    const res = await http.post(`/shops/${shopId}/inquiries`, {
      title: title,
      question: question,
    });
    if (res.status === 200) {
    }
  } catch (error) {}
};
