import type { Card } from "./types";

// State variables
let galleryCards = $state([] as Card[]);
let deckCards = $state([] as Card[]);

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
    // Create a deep copy of the card to avoid reference issues
    const cardCopy: Card = {
      ...card,
      selected: false // Ensure selected is false for the new card
    };
    
    // Get current deck cards and add the new card
    const currentDeckCards = getDeckCards();
    const updatedDeckCards = [...currentDeckCards, cardCopy];
    
    // Update the deck state
    updateDeckCards(updatedDeckCards);
  }
}