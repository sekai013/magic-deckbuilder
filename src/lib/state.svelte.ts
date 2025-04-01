// Re-export all functions from the separate state files
// This maintains backward compatibility with existing code

// Gallery state
export {
  getGalleryCards,
  updateGalleryCards
} from './gallery.svelte';

// Deck state
export {
  getDeckCards,
  updateDeckCards,
  addCardToDeck,
  removeCardFromDeck
} from './deck.svelte';

// Mana value filter state
export {
  getManaValueFilter,
  updateManaValueFilter,
  toggleManaValueCondition,
  selectAllManaValueConditions,
  clearAllManaValueConditions,
  isManaValueConditionSelected,
  hasSelectedManaValueConditions
} from './manaValueFilter.svelte';

// Color filter state
export {
  getColorFilter,
  updateColorFilter,
  toggleColor,
  clearColorFilter,
  changeColorFilterType,
  isSelectedValue,
  isSelectedFilterType
} from './colorFilter.svelte';