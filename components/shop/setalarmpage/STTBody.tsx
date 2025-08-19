import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import ReadyIcon from "@/assets/images/readyicon.svg";
import LoadingIcon from "@/assets/images/loadingicon.svg";
import HearIcon from "@/assets/images/hearingicon.svg";
import Voice from "@react-native-voice/voice";
import { useAlarmStore } from "@/store/alarm/useAlarmStore";
import { router } from "expo-router";

const ListeningBars: React.FC<{ size?: number; color?: string }> = ({
  size = 33,
  color = "#FFFFFF",
}) => {
  const v1 = React.useRef(new Animated.Value(0)).current;
  const v2 = React.useRef(new Animated.Value(0)).current;
  const v3 = React.useRef(new Animated.Value(0)).current;

  const MIN = 8; // px
  const MAX = 27; // px
  const BAR_W = 6; // px
  const GAP = 6; // px

  useEffect(() => {
    const loop = (val: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: 1,
            duration: 320,
            delay,
            useNativeDriver: false,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 320,
            useNativeDriver: false,
          }),
        ])
      ).start();

    loop(v1, 0);
    loop(v2, 140);
    loop(v3, 280);

    return () => {
      v1.stopAnimation();
      v2.stopAnimation();
      v3.stopAnimation();
    };
  }, [v1, v2, v3]);

  const h1 = v1.interpolate({ inputRange: [0, 1], outputRange: [MIN, MAX] });
  const h2 = v2.interpolate({ inputRange: [0, 1], outputRange: [MIN, MAX] });
  const h3 = v3.interpolate({ inputRange: [0, 1], outputRange: [MIN, MAX] });

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: MAX,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={{
            width: BAR_W,
            height: h1,
            borderRadius: BAR_W / 2,
            backgroundColor: color,
            marginHorizontal: GAP / 2,
          }}
        />
        <Animated.View
          style={{
            width: BAR_W,
            height: h2,
            borderRadius: BAR_W / 2,
            backgroundColor: color,
            marginHorizontal: GAP / 2,
          }}
        />
        <Animated.View
          style={{
            width: BAR_W,
            height: h3,
            borderRadius: BAR_W / 2,
            backgroundColor: color,
            marginHorizontal: GAP / 2,
          }}
        />
      </View>
    </View>
  );
};

type STTPhase = "ready" | "idle" | "listening";

const OUTER_SIZE = 120;
const INNER_SIZE = 102.21;

const STTBody = () => {
  const [phase, setPhase] = useState<STTPhase>("ready");

  const { updateAlarm } = useAlarmStore();
  const [recognized, setRecognized] = useState("");

  const ringScale = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(1)).current;
  const popScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Voice.onSpeechStart = () => {};
    Voice.onSpeechEnd = () => {};
    Voice.onSpeechError = (_e: any) => {};
    Voice.onSpeechResults = (e: any) => {
      const text = e?.value?.[0] ?? "";
      setRecognized(text);
      updateAlarm({ contents: text });
    };
    Voice.onSpeechPartialResults = (e: any) => {
      const text = e?.value?.[0] ?? "";
      setRecognized(text);
      updateAlarm({ contents: text });
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [updateAlarm]);

  useEffect(() => {
    ringScale.stopAnimation();
    ringOpacity.stopAnimation();
    ringScale.setValue(1);
    ringOpacity.setValue(1);

    if (phase === "idle") {
      startIdlePulse();
      const t = setTimeout(() => setPhase("listening"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "listening") {
      startListeningPulse();
    }
  }, [phase]);

  useEffect(() => {
    const start = async () => {
      try {
        await Voice.start("ko-KR");
      } catch {}
    };
    const stop = async () => {
      try {
        await Voice.stop();
      } catch {}
    };

    if (phase === "listening") {
      start();
    } else {
      stop();
    }
  }, [phase]);

  const startIdlePulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ringOpacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startListeningPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ringScale, {
            toValue: 1.08,
            duration: 350,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity, {
            toValue: 0.6,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(ringScale, {
            toValue: 1,
            duration: 350,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  const handlePress = async () => {
    await new Promise((res) =>
      Animated.sequence([
        Animated.timing(popScale, {
          toValue: 1.05,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(popScale, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start(() => res(null))
    );

    if (phase === "ready") {
      setPhase("idle");
    } else if (phase === "idle") {
      setPhase("listening");
    } else if (phase === "listening") {
      try {
        await Voice.stop();
      } catch {}
      setPhase("ready");
      router.push("/(home)/shop/writealarm/recommendtext");
    }
  };

  const Icon = useMemo(() => {
    switch (phase) {
      case "ready":
        return ReadyIcon;
      case "idle":
        return LoadingIcon;
      case "listening":
        return null;
      default:
        return ReadyIcon;
    }
  }, [phase]);

  const IconComp = Icon;

  return (
    <View className="flex-1 justify-between px-4">
      <View>
        <View className="flex-row gap-1">
          <EmptyCircle />
          <FilledCircle />
          <EmptyCircle />
          <EmptyCircle />
          <EmptyCircle />
          <EmptyCircle />
        </View>
        <Text className="text-[26px] font-bold pt-10">
          알람에 대해{"\n"}말씀해주세요!
        </Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <Animated.View
          style={{
            width: OUTER_SIZE,
            height: OUTER_SIZE,
            borderRadius: OUTER_SIZE / 2,
            backgroundColor: "#FFECD9",
            position: "absolute",
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          }}
        />

        <Animated.View style={{ transform: [{ scale: popScale }] }}>
          <Pressable
            onPress={handlePress}
            className="rounded-full justify-center items-center"
            style={{
              width: INNER_SIZE,
              height: INNER_SIZE,
              backgroundColor: "#FFB668",
            }}
          >
            {phase === "listening" ? (
              <ListeningBars size={33} color="#FFFFFF" />
            ) : IconComp ? (
              <IconComp />
            ) : null}
          </Pressable>
        </Animated.View>
      </View>

      <View className="h-40" />
    </View>
  );
};

export default STTBody;
