import type { Card } from "./types";

// State variables
let deckCards = $state([] as Card[]);

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