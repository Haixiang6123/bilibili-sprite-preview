/**
 * Get value with [min, max]
 * @param value: Current value
 * @param min: Minimum value
 * @param max: Maximum value
 */
export const within = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
