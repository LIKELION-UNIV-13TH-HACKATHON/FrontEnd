import fs from "fs";

export default ({ config }) => {
  const next = {
    ...(config || {}),
    name: "FrontEnd",
    slug: "FrontEnd",
    scheme: "frontend",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      ...(config?.ios || {}),
      supportsTablet: true,
      bundleIdentifier: "com.ddingdong.frontend",
      googleServicesFile: "./GoogleService-Info.plist",
      deploymentTarget: "13.0",
      infoPlist: {
        ...(config?.ios?.infoPlist || {}),
        NSLocationWhenInUseUsageDescription:
          "현재 위치 기반 서비스를 제공하기 위해 위치 권한이 필요합니다.",
        UIBackgroundModes: ["remote-notification"],
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
          NSAllowsArbitraryLoadsInWebContent: true,
        },
        NSPhotoLibraryUsageDescription:
          "프로필 사진 및 이미지 업로드를 위해 사진 보관함 접근 권한이 필요합니다.",
        NSCameraUsageDescription:
          "사진 촬영을 통한 이미지 업로드를 위해 카메라 접근 권한이 필요합니다.",
        NSPhotoLibraryAddUsageDescription:
          "촬영한 사진을 앨범에 저장하기 위해 쓰기 권한이 필요합니다.",
        NSMicrophoneUsageDescription:
          "음성 인식을 위해 마이크 접근이 필요합니다.",
        NSSpeechRecognitionUsageDescription:
          "음성 인식 처리를 위해 권한이 필요합니다.",
      },
    },
    web: {
      ...(config?.web || {}),
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      ...(config?.plugins || []),
      "expo-router",
      "expo-build-properties",
      "@react-native-firebase/app",
      "@react-native-firebase/messaging",
      "expo-image-picker",
    ],
    experiments: { typedRoutes: true },
    extra: {
      ...(config?.extra || {}),
      kakaoJavascriptKey: process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY,
    },
  };

  // ANDROID: include google-services.json only when it exists
  const gsPath = "./google-services.json";
  next.android = {
    ...(config?.android || {}),
    adaptiveIcon: { backgroundColor: "#ffffff" },
    edgeToEdgeEnabled: true,
    permissions: [
      "CAMERA",
      "READ_MEDIA_IMAGES",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
    ],
    package: "com.ddingdong.frontend",
    ...(fs.existsSync(gsPath) ? { googleServicesFile: gsPath } : {}),
  };

  if (!fs.existsSync(gsPath)) {
    console.warn(`android.googleServicesFile skipped (not found at ${gsPath})`);
  }

  return { expo: next };
};
