import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  ios: {
    ...config.ios,
    bundleIdentifier: 'com.ddingdong.frontend', // 기존 번들 ID 유지
    infoPlist: {
      // ✅ Info.plist에 들어갈 항목 정의
      KAKAO_APP_KEY: process.env.KAKAO_NATIVE_APP_KEY,
      CFBundleURLTypes: [
        {
          CFBundleTypeRole: 'Editor',
          CFBundleURLSchemes: [
            `kakao${process.env.KAKAO_NATIVE_APP_KEY}`, // ← Kakao redirect URI 처리
            'frontend', // 기존 앱 스킴 유지
          ],
        },
      ],
      LSApplicationQueriesSchemes: [
        'kakaokompassauth',
        'storykompassauth',
        'kakaolink',
      ],
    },
  },
});
