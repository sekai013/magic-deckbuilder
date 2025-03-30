import type { Card } from "./types";
import type { ManaValueFilter } from "./manaValueFilter";
import { createManaValueFilter, addCondition, removeCondition, isConditionSelected } from "./manaValueFilter";
import type { ManaValueCondition } from "./manaValueFilter";
import { FilterTypes, select as toggle, changeType, type ColorFilter, type NoColorFilter } from "./colorFilter";
import { Colorless, type SingleColor } from "./colors";

// State variables
let galleryCards = $state([] as Card[]);
let deckCards = $state([] as Card[]);
let manaValueFilter = $state<ManaValueFilter>(createManaValueFilter());
let colorFilter = $state<ColorFilter>({ type: FilterTypes.Exact } as NoColorFilter);

// Gallery cards getters and setters
export function getGalleryCards(): Card[] {
  return galleryCards;
}

export function updateGalleryCards(cards: Card[]) {
  galleryCards = cards;
}

// Deck cards getters and setters
export function getDeckCards(): Card[] {
  return deckCards;
}

export function updateDeckCards(cards: Card[]) {
  deckCards = cards;
}

/**
 * Adds a card to the deck
 * @param card The card to add to the deck
 */
export async function addCardToDeck(card: Card): Promise<void> {
  if (card) {
    // Get current deck cards and add the new card
    const currentDeckCards = getDeckCards();
    const updatedDeckCards = [...currentDeckCards, card];
    
    // Update the deck state
    updateDeckCards(updatedDeckCards);
  }
}

/**
 * Removes a card from the deck
 * @param cardId The ID of the card to remove from the deck
 */
export async function removeCardFromDeck(cardId: string): Promise<void> {
  if (!cardId) return;
  
  // Get current deck cards
  const currentDeckCards = getDeckCards();
  
  // Find the index of the first occurrence of the card
  const indexToRemove = currentDeckCards.findIndex(deckCard => deckCard.id === cardId);
  
  // If the card is found, remove only that one instance
  if (indexToRemove !== -1) {
    // Create a new array without the card at the found index
    const updatedDeckCards = [
      ...currentDeckCards.slice(0, indexToRemove),
      ...currentDeckCards.slice(indexToRemove + 1)
    ];
    
    // Update the deck state
    updateDeckCards(updatedDeckCards);
  }
}

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

// Color filter getters and setters
/**
 * Gets the current color filter
 * @returns The current color filter
 */
export function getColorFilter(): ColorFilter {
  return colorFilter;
}

/**
 * Updates the color filter
 * @param filter The new color filter
 */
export function updateColorFilter(filter: ColorFilter): void {
  colorFilter = filter;
}

/**
 * Toggles a color in the filter
 * @param color The color to toggle
 */
export function toggleColor(color: Colorless | SingleColor): void {
  colorFilter = toggle(colorFilter, color);
}

/**
 * Clears the color filter
 */
export function clearColorFilter(): void {
  colorFilter = { type: FilterTypes.Exact } as NoColorFilter;
}

/**
 * Changes the color filter type
 * @param filterType The new filter type
 */
export function changeColorFilterType(filterType: typeof FilterTypes[keyof typeof FilterTypes]): void {
  colorFilter = changeType(colorFilter, filterType);
}

/**
 * Checks if a specific color value is selected in the filter
 * @param value The color value to check
 * @returns True if the color is selected, false otherwise
 */
export function isSelectedValue(value: Colorless | SingleColor): boolean {
  if (!('value' in colorFilter)) {
    return false;
  }

  if (typeof colorFilter.value === 'string') {
    return colorFilter.value === value;
  }

  // For multicolor
  return colorFilter.value.colors && colorFilter.value.colors.has(value as SingleColor);
}

/**
 * Checks if a specific filter type is the current filter type
 * @param filterType The filter type to check
 * @returns True if the filter type is selected, false otherwise
 */
export function isSelectedFilterType(filterType: typeof FilterTypes[keyof typeof FilterTypes]): boolean {
  return colorFilter.type === filterType;
}