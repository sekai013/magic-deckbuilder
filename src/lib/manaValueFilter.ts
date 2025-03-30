/**
 * Union type representing mana value conditions for filtering
 * Values 0-6 represent exact mana values, while 7 represents "7 or more"
 */
export type ManaValueCondition = Branded<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>;

/**
 * Constants for easier reference to ManaValueCondition values
 */
export const ManaValueConditions = {
  EqualToZero: 0 as ManaValueCondition,
  EqualToOne: 1 as ManaValueCondition,
  EqualToTwo: 2 as ManaValueCondition,
  EqualToThree: 3 as ManaValueCondition,
  EqualToFour: 4 as ManaValueCondition,
  EqualToFive: 5 as ManaValueCondition,
  EqualToSix: 6 as ManaValueCondition,
  GreaterThanOrEqualToSeven: 7 as ManaValueCondition
};

/**
 * Type representing a mana value filter
 * Contains a set of selected ManaValueCondition values
 */
export type ManaValueFilter = {
  readonly conditions: ReadonlySet<ManaValueCondition>;
};

export function createManaValueFilter(...conditions: ManaValueCondition[]): ManaValueFilter {
  return {
    conditions: conditions.reduce((set, cond) => set.add(cond), new Set<ManaValueCondition>())
  }
}

export function addCondition(filter: ManaValueFilter, condition: ManaValueCondition): ManaValueFilter {
  return {
    conditions: filter.conditions.union(new Set<ManaValueCondition>().add(condition)),
  };
}

export function removeCondition(filter: ManaValueFilter, condition: ManaValueCondition): ManaValueFilter {
  return {
    conditions: filter.conditions.difference(new Set<ManaValueCondition>().add(condition)),
  }
}

/**
 * Check if a condition is selected in the filter
 * @param filter The filter to check
 * @param condition The condition to check
 * @returns True if the condition is selected, false otherwise
 */
export function isConditionSelected(filter: ManaValueFilter, condition: ManaValueCondition): boolean {
  return filter.conditions.has(condition);
}
