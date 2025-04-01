import type { Card } from "./types";

// State variables
let galleryCards = $state([] as Card[]);

// Gallery cards getters and setters
export function getGalleryCards(): Card[] {
  return galleryCards;
}

export function updateGalleryCards(cards: Card[]) {
  galleryCards = cards;
}