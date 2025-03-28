import { describe, it, expect } from 'vitest';
import { get } from 'svelte/store';
import { deckCards } from '../../services/DeckCardService';

describe('DeckCardService', () => {
  it('should return an array of cards', () => {
    const cards = get(deckCards);
    expect(Array.isArray(cards)).toBe(true);
  });

  it('should contain the expected cards', () => {
    const cards = get(deckCards);
    expect(cards.length).toBeGreaterThan(0);
    
    // Count occurrences of each card
    const cardCounts = cards.reduce((acc, card) => {
      acc[card.id] = (acc[card.id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Check for expected counts
    expect(cardCounts['2']).toBe(4); // 4 Lightning Bolts
    expect(cardCounts['3']).toBe(2); // 2 Counterspells
    expect(cardCounts['4']).toBe(1); // 1 Wrath of God
  });

  it('should have all required properties for each card', () => {
    const cards = get(deckCards);
    cards.forEach(card => {
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('manaCost');
      expect(card).toHaveProperty('imageUrl');
      expect(card).toHaveProperty('selected');
    });
  });
});