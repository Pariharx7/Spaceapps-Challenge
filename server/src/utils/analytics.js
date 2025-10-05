/**
 * Calculates a specific percentile from an array of numbers.
 * @param {number[]} dataArray - An array of numbers.
 * @param {number} percentile - The percentile to calculate (0-100).
 * @returns {number} The value at the given percentile.
 */
export const getPercentile = (dataArray, percentile) => {
  if (dataArray.length === 0) return 0;
  dataArray.sort((a, b) => a - b);
  const index = (percentile / 100) * (dataArray.length - 1);
  // Simple interpolation for non-integer indices
  if (Math.floor(index) === index) {
    return dataArray[index];
  }
  const lower = Math.floor(index);
  const upper = lower + 1;
  return dataArray[lower] + (index - lower) * (dataArray[upper] - dataArray[lower]);
};