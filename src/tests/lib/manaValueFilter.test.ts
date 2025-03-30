import { describe, it, expect } from 'vitest';
import {
  ManaValueConditions,
  addCondition,
  createManaValueFilter,
  isConditionSelected,
  removeCondition,
} from '../../lib/manaValueFilter';

describe('ManaValueCondition', () => {
  it('should have values for 0 through 6 and SevenPlus', () => {
    expect(ManaValueConditions.EqualToZero).toBe(0);
    expect(ManaValueConditions.EqualToOne).toBe(1);
    expect(ManaValueConditions.EqualToTwo).toBe(2);
    expect(ManaValueConditions.EqualToThree).toBe(3);
    expect(ManaValueConditions.EqualToFour).toBe(4);
    expect(ManaValueConditions.EqualToFive).toBe(5);
    expect(ManaValueConditions.EqualToSix).toBe(6);
    expect(ManaValueConditions.GreaterThanOrEqualToSeven).toBe(7);
  });
});

describe('ManaValueFilter', () => {
  it('should add a condition immutably', () => {
    const initialFilter = createManaValueFilter(ManaValueConditions.EqualToThree);
    const updatedFilter = addCondition(initialFilter, ManaValueConditions.EqualToFive);

    // Original filter should be unchanged
    expect(isConditionSelected(initialFilter, ManaValueConditions.EqualToThree)).toBe(true);
    expect(isConditionSelected(initialFilter, ManaValueConditions.EqualToFive)).toBe(false);

    // New filter should have the changes
    expect(isConditionSelected(updatedFilter, ManaValueConditions.EqualToThree)).toBe(true);
    expect(isConditionSelected(updatedFilter, ManaValueConditions.EqualToFive)).toBe(true);
  });

  it('should remove a condition immutably', () => {
    const initialFilter = createManaValueFilter(ManaValueConditions.EqualToThree);
    const updatedFilter = removeCondition(initialFilter, ManaValueConditions.EqualToThree);

    // Original filter should be unchanged
    expect(isConditionSelected(initialFilter, ManaValueConditions.EqualToThree)).toBe(true);

    // New filter should have the changes
    expect(isConditionSelected(updatedFilter, ManaValueConditions.EqualToThree)).toBe(false);
  });
});
