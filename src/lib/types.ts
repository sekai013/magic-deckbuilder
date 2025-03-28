/**
 * Interface for Magic: The Gathering card data
 */
export interface Card {
  id: string;         // Unique identifier for the card
  name: string;       // Card name
  manaCost: string;   // Mana cost (e.g., "{2}{R}{R}")
  imageUrl: string;   // URL to the card image
  selected?: boolean; // Optional prop to track if the card is selected
}