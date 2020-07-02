/**
 * Maps the given number in the range (start1, stop1) to (start2, stop2)
 * @param {number} n
 * @param {number} start1
 * @param {number} stop1
 * @param {number} start2
 * @param {number} stop2
 */
function mapToRange(n, start1, stop1, start2, stop2) {
  return (n - start1) * ((stop2 - start2) / (stop1 - start1)) + stop2;
}

/**
 * Linear interpolate the number to another number
 * @param {number} a 
 * @param {number} b 
 * @param {number} t 
 */
function linearInterpolate(a, b, t) {
    if (t < 0.5) {
      return a + (b - a) * t;
    } else {
      return b - (b - a) * (1.0 - t);
    }
  }