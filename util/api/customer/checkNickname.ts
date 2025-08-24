import { http } from "@/util/api/http";

export type CheckNicknameResponse = {
  isExistsNickname: boolean;
};

export const checkNickname = async (
  nickname: string
): Promise<CheckNicknameResponse> => {
  if (!nickname || nickname.trim().length === 0) {
    throw new Error("닉네임을 입력해주세요.");
  }

  try {
    const res = await http.get<CheckNicknameResponse>(
      "/members/check-nickname",
      {
        params: { nickname },
      }
    );

    if (res?.data && typeof res.data.isExistsNickname === "boolean") {
      return res.data;
    }

    return { isExistsNickname: false };
  } catch (err) {
    throw err;
  }
};

export default checkNickname;
