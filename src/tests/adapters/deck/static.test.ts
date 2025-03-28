import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadDeckCards } from '../../../adapters/deck/static.svelte';
import { getDeckCards, updateDeckCards } from '../../../lib/state.svelte';
import type { Card } from '../../../lib/types';

describe('Deck Static Adapter', () => {
  // Save original state to restore after tests
  let originalDeckCards: Card[];

  beforeEach(() => {
    // Store original state
    originalDeckCards = [...getDeckCards()];
    
    // Reset state to empty array before each test
    updateDeckCards([]);
  });

  afterEach(() => {
    // Restore original state after each test
    updateDeckCards(originalDeckCards);
  });

  it('should load initial deck cards', async () => {
    // Verify deck cards are empty initially
    expect(getDeckCards().length).toBe(0);
    
    // Load deck cards
    await loadDeckCards();
    
    // Verify deck cards are loaded
    const deckCards = getDeckCards();
    expect(deckCards.length).toBeGreaterThan(0);
  });

  it('should load cards with correct properties', async () => {
    // Load deck cards
    await loadDeckCards();
    
    // Verify each card has the required properties
    const deckCards = getDeckCards();
    deckCards.forEach(card => {
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('manaCost');
      expect(card).toHaveProperty('imageUrl');
      expect(card).toHaveProperty('selected');
    });
  });

  it('should load the correct number of each card', async () => {
    // Load deck cards
    await loadDeckCards();
    
    // Count occurrences of each card
    const deckCards = getDeckCards();
    const cardCounts = deckCards.reduce((acc: Record<string, number>, card: Card) => {
      acc[card.id] = (acc[card.id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Check for expected counts
    expect(cardCounts['2']).toBe(4); // 4 Lightning Bolts
    expect(cardCounts['3']).toBe(2); // 2 Counterspells
    expect(cardCounts['4']).toBe(1); // 1 Wrath of God
  });

  it('should set selected property to false for all cards', async () => {
    // Load deck cards
    await loadDeckCards();
    
    // Verify all cards have selected set to false
    const deckCards = getDeckCards();
    deckCards.forEach(card => {
      expect(card.selected).toBe(false);
    });
  });

  it('should load cards with correct data', async () => {
    // Load deck cards
    await loadDeckCards();
    
    // Verify specific cards are loaded with correct data
    const deckCards = getDeckCards();
    
    // Check Lightning Bolt
    const lightningBolt = deckCards.find(card => card.id === '2');
    expect(lightningBolt).toBeDefined();
    expect(lightningBolt?.name).toBe('Lightning Bolt');
    expect(lightningBolt?.manaCost).toBe('{R}');
    
    // Check Counterspell
    const counterspell = deckCards.find(card => card.id === '3');
    expect(counterspell).toBeDefined();
    expect(counterspell?.name).toBe('Counterspell');
    expect(counterspell?.manaCost).toBe('{U}{U}');
    
    // Check Wrath of God
    const wrathOfGod = deckCards.find(card => card.id === '4');
    expect(wrathOfGod).toBeDefined();
    expect(wrathOfGod?.name).toBe('Wrath of God');
    expect(wrathOfGod?.manaCost).toBe('{2}{W}{W}');
  });
});