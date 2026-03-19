export const calculateSavingsData = (activeTip: any, hours: number, usage: number) => {
  if (!activeTip) return null;

  const isTime = activeTip.calculationType === 'TIME';
  const isVolume = activeTip.calculationType === 'VOLUME';
  const isHybrid = activeTip.calculationType === 'HYBRID';

  const effectiveHours = (isTime || isHybrid) ? hours : 0;
  const effectiveUsage = (isVolume || isHybrid) ? usage : 0;

  const oldTotal = (effectiveHours * (activeTip.oldFixedRate || 0)) + (effectiveUsage * (activeTip.oldVarRate || 0));
  const newTotal = (effectiveHours * (activeTip.newFixedRate || 0)) + (effectiveUsage * (activeTip.newVarRate || 0));
  
  const savingsNum = oldTotal - newTotal;
  const savings = savingsNum.toFixed(2);
  const percentSaved = oldTotal > 0 ? ((savingsNum / oldTotal) * 100).toFixed(0) : "0";

  return { oldTotal, newTotal, savings, percentSaved, isTime, isVolume, isHybrid };
};