// import "dotenv/config";

// export default ({ config }) => ({
//   ...config,
//   ios: {
//     ...config.ios,
//     bundleIdentifier: "com.ddingdong.frontend", // 기존 번들 ID 유지
//     infoPlist: {
//       NSLocationWhenInUseUsageDescription:
//         "현재 위치를 기반으로 주변 매장을 표시하기 위해 위치 권한이 필요합니다.",
//       // ✅ Info.plist에 들어갈 항목 정의
//       KAKAO_APP_KEY: process.env.KAKAO_NATIVE_APP_KEY,
//       CFBundleURLTypes: [
//         {
//           CFBundleTypeRole: "Editor",
//           CFBundleURLSchemes: [
//             `kakao${process.env.KAKAO_NATIVE_APP_KEY}`, // ← Kakao redirect URI 처리
//             "frontend", // 기존 앱 스킴 유지
//           ],
//         },
//       ],
//       LSApplicationQueriesSchemes: [
//         "kakaokompassauth",
//         "storykompassauth",
//         "kakaolink",
//       ],
//     },
//   },
//   ...config,
//   extra: {
//     kakaoJavascriptKey: process.env.KAKAO_JAVASCRIPT_KEY,
//   },
// });
