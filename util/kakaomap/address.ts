import axios from "axios";

export const getCoordinates = async (address: string) => {
  const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
    const data = response.data;
    if (data.documents && data.documents.length > 0) {
      const { x, y } = data.documents[0]; // x: 경도, y: 위도
      return { x, y };
    }
    return null;
  } catch (error) {
    console.error("주소 -> 좌표 변환 실패:", error);
    return null;
  }
};
