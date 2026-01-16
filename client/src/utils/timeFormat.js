export const formatDisplayTime = (ms) => {
  const totalSeconds = (ms / 1000).toFixed(2);
  const min = Math.floor(totalSeconds / 60);
  const sec = (totalSeconds % 60).toFixed(2);

  return min > 0 ? `${min}分${sec}秒` : `${sec}秒`;
}