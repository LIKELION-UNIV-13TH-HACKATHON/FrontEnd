export const timeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000); // 초 단위 차이

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  if (diff < 31104000) return `${Math.floor(diff / 2592000)}개월 전`;
  return `${Math.floor(diff / 31104000)}년 전`;
};
