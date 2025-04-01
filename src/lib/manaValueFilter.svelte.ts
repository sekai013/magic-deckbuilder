import type { ManaValueFilter } from "./manaValueFilter";
import { createManaValueFilter, addCondition, removeCondition, isConditionSelected } from "./manaValueFilter";
import type { ManaValueCondition } from "./manaValueFilter";

// State variables
let manaValueFilter = $state<ManaValueFilter>(createManaValueFilter());

// Mana value filter getters and setters
/**
 * Gets the current mana value filter
 * @returns The current mana value filter
 */
export function getManaValueFilter(): ManaValueFilter {
  return manaValueFilter;
}

/**
 * Updates the mana value filter
 * @param filter The new mana value filter
 */
export function updateManaValueFilter(filter: ManaValueFilter): void {
  manaValueFilter = filter;
}

/**
 * Toggles a mana value condition in the filter
 * @param condition The condition to toggle
 */
export function toggleManaValueCondition(condition: ManaValueCondition): void {
  if (isConditionSelected(manaValueFilter, condition)) {
    // Remove the condition if it's already selected
    manaValueFilter = removeCondition(manaValueFilter, condition);
  } else {
    // Add the condition if it's not selected
    manaValueFilter = addCondition(manaValueFilter, condition);
  }
}

/**
 * Selects all mana value conditions
 */
export function selectAllManaValueConditions(): void {
  // Create a filter with all conditions
  manaValueFilter = createManaValueFilter(
    0 as ManaValueCondition,
    1 as ManaValueCondition,
    2 as ManaValueCondition,
    3 as ManaValueCondition,
    4 as ManaValueCondition,
    5 as ManaValueCondition,
    6 as ManaValueCondition,
    7 as ManaValueCondition
  );
}

/**
 * Clears all mana value conditions
 */
export function clearAllManaValueConditions(): void {
  // Create an empty filter
  manaValueFilter = createManaValueFilter();
}

/**
 * Checks if a mana value condition is selected
 * @param condition The condition to check
 * @returns True if the condition is selected, false otherwise
 */
export function isManaValueConditionSelected(condition: ManaValueCondition): boolean {
  return isConditionSelected(manaValueFilter, condition);
}

/**
 * Checks if any mana value conditions are selected
 * @returns True if any conditions are selected, false otherwise
 */
export function hasSelectedManaValueConditions(): boolean {
  return manaValueFilter.conditions.size > 0;
}