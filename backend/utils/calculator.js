/**
 * @param {number} usageValue
 * @param {number} oldRate 
 * @param {number} newRate
 */
const calculateSavings = (usageValue, oldRate, newRate) => {
  const oldTotal = usageValue * oldRate;
  const newTotal = usageValue * newRate;
  const savings = oldTotal - newTotal;
  const percentage = (savings / oldTotal) * 100;

  return {
    oldTotal: oldTotal.toFixed(2),
    newTotal: newTotal.toFixed(2),
    savings: savings.toFixed(2),
    percentage: percentage.toFixed(1)
  };
};

module.exports = calculateSavings;