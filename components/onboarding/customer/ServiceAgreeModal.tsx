import { View, Text, Modal, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import AgreeIcon from "@/assets/images/agreeicon.svg";
import { Feather } from "@expo/vector-icons";

const ServiceAgreeModal: React.FC = () => {
  const [showTerms, setShowTerms] = useState(true);
  const [serviceAgree, setServiceAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const { user, setUser } = useUserInfoStore();

  const allAgreed = useMemo(
    () => serviceAgree && privacyAgree,
    [serviceAgree, privacyAgree]
  );

  const handleAgree = () => {
    if (!allAgreed) return;
    // TODO: 서버에 동의 이력을 전송하는 API 연결해야함
    setUser({ agree: true });
    setShowTerms(false);
  };

  return (
    <View>
      <Modal visible={showTerms} transparent animationType="fade">
        <View className="flex-1 bg-black/50 items-center justify-center">
          <View className="bg-white w-11/12 rounded-2xl p-6">
            <Text className="text-center text-xl font-extrabold">
              {user.nickname + "님 환영합니다!"}
            </Text>
            <Text className="text-center text-[14px] text-[#F28715] font-semibold mt-2">
              띵동과 함께 즐거운 시간 보내세요!
            </Text>

            <View className="items-center my-6">
              <AgreeIcon />
            </View>

            <View className=" space-y-0.5 mt-4">
              <Pressable
                onPress={() => setServiceAgree((v) => !v)}
                className="flex-row items-center gap-3"
              >
                <View
                  className={`w-4 h-4 rounded-[4px] border ${
                    serviceAgree
                      ? "border-[#F28715] bg-[#FF8A0D]"
                      : "border-[#BFBFBF] bg-white"
                  } items-center justify-center`}
                >
                  {serviceAgree ? (
                    <Feather name="check" size={12} color="#fff" />
                  ) : null}
                </View>
                <Text className="text-[#BFBFBF] text-[13px]">
                  서비스 운영 약관 동의
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setPrivacyAgree((v) => !v)}
                className="flex-row items-center gap-3"
              >
                <View
                  className={`w-4 h-4 rounded-[4px] border ${
                    privacyAgree
                      ? "border-[#F28715] bg-[#FF8A0D]"
                      : "border-[#BFBFBF] bg-white"
                  } items-center justify-center`}
                >
                  {privacyAgree ? (
                    <Feather name="check" size={12} color="#fff" />
                  ) : null}
                </View>
                <Text className="text-[#BFBFBF] text-[13px]">
                  개인정보 수집 및 이용 동의
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={handleAgree}
              disabled={!allAgreed}
              className={`mt-6 rounded-xl py-3.5 items-center ${
                allAgreed ? "bg-[#F28715]" : "bg-[#EDEDED]"
              }`}
            >
              <Text
                className={`font-bold ${
                  allAgreed
                    ? "text-white font-extrabold text-lg"
                    : "text-[#BFBFBF] font-extrabold text-lg"
                }`}
              >
                동의하고 시작하기
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ServiceAgreeModal;
