import { expect, test, describe } from 'vitest';
import { calculateSavingsData } from './costEngine';

describe('CloudCost_Wise Math Engine', () => {
  
  test('Hybrid Model Logic (e.g. NAT Gateway Swap)', () => {
    const natTip = {
      calculationType: 'HYBRID',
      oldFixedRate: 0.045, 
      newFixedRate: 0.011,
      oldVarRate: 0.045,
      newVarRate: 0
    };
    const result = calculateSavingsData(natTip, 720, 100);
    expect(result?.savings).toBe("28.98");
  });

  test('Volume Model Logic (e.g. S3 Tiering)', () => {
    const s3Tip = {
      calculationType: 'VOLUME',
      oldVarRate: 0.023,
      newVarRate: 0.010
    };
    const result = calculateSavingsData(s3Tip, 720, 1000);
    expect(result?.savings).toBe("13.00");
  });

  test('Time Model Logic (e.g. Instance Upgrade)', () => {
    const instanceTip = {
      calculationType: 'TIME',
      oldFixedRate: 0.085,
      newFixedRate: 0.068
    };
    const result = calculateSavingsData(instanceTip, 720, 100);
    expect(result?.savings).toBe("12.24");
  });

});