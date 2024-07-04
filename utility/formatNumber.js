export const formatNumber = (num) => {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
  const scaledNum = num / Math.pow(10, magnitude * 3);
  const suffix = suffixes[magnitude];

  if (magnitude === 0) {
    return num.toFixed(0);
  } else {
    return scaledNum.toFixed(2) + suffix;
  }
};
