import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadGalleryCards } from '../../../adapters/gallery/static.svelte';
import { getGalleryCards, updateGalleryCards } from '../../../lib/state.svelte';
import type { Card } from '../../../lib/types';

describe('Gallery Static Adapter', () => {
  // Save original state to restore after tests
  let originalGalleryCards: Card[];

  beforeEach(() => {
    // Store original state
    originalGalleryCards = [...getGalleryCards()];
    
    // Reset state to empty array before each test
    updateGalleryCards([]);
  });

  afterEach(() => {
    // Restore original state after each test
    updateGalleryCards(originalGalleryCards);
  });

  it('should load initial gallery cards', async () => {
    // Verify gallery cards are empty initially
    expect(getGalleryCards().length).toBe(0);
    
    // Load gallery cards
    await loadGalleryCards();
    
    // Verify gallery cards are loaded
    const galleryCards = getGalleryCards();
    expect(galleryCards.length).toBeGreaterThan(0);
  });

  it('should load cards with correct properties', async () => {
    // Load gallery cards
    await loadGalleryCards();
    
    // Verify each card has the required properties
    const galleryCards = getGalleryCards();
    galleryCards.forEach(card => {
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('manaCost');
      expect(card).toHaveProperty('imageUrl');
      expect(card).toHaveProperty('selected');
    });
  });

  it('should load specific cards', async () => {
    // Load gallery cards
    await loadGalleryCards();
    
    // Verify specific cards are loaded
    const galleryCards = getGalleryCards();
    
    // Check for Black Lotus
    const blackLotus = galleryCards.find(card => card.id === '1');
    expect(blackLotus).toBeDefined();
    expect(blackLotus?.name).toBe('Black Lotus');
    expect(blackLotus?.manaCost).toBe('{0}');
    
    // Check for Lightning Bolt
    const lightningBolt = galleryCards.find(card => card.id === '2');
    expect(lightningBolt).toBeDefined();
    expect(lightningBolt?.name).toBe('Lightning Bolt');
    expect(lightningBolt?.manaCost).toBe('{R}');
    
    // Check for Counterspell
    const counterspell = galleryCards.find(card => card.id === '3');
    expect(counterspell).toBeDefined();
    expect(counterspell?.name).toBe('Counterspell');
    expect(counterspell?.manaCost).toBe('{U}{U}');
    
    // Check for Wrath of God
    const wrathOfGod = galleryCards.find(card => card.id === '4');
    expect(wrathOfGod).toBeDefined();
    expect(wrathOfGod?.name).toBe('Wrath of God');
    expect(wrathOfGod?.manaCost).toBe('{2}{W}{W}');
  });

  it('should set selected property to false for all cards', async () => {
    // Load gallery cards
    await loadGalleryCards();
    
    // Verify all cards have selected set to false
    const galleryCards = getGalleryCards();
    galleryCards.forEach(card => {
      expect(card.selected).toBe(false);
    });
  });
});