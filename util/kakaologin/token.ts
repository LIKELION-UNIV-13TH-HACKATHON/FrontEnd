import AsyncStorage from "@react-native-async-storage/async-storage";

const AccessToken = "access_token";

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(AccessToken, token);
  } catch (error) {
    console.log("토큰 저장 실패 ", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AccessToken);
  } catch (error) {
    console.log("토큰 불러오기 실패 ", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(AccessToken);
  } catch (error) {
    console.log("토큰 삭제 실패 ", error);
  }
};
