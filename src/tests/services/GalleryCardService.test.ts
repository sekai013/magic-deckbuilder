import { describe, it, expect } from 'vitest';
import { get } from 'svelte/store';
import { galleryCards } from '../../services/GalleryCardService';

describe('GalleryCardService', () => {
  it('should return an array of cards', () => {
    const cards = get(galleryCards);
    expect(Array.isArray(cards)).toBe(true);
  });

  it('should contain the expected cards', () => {
    const cards = get(galleryCards);
    expect(cards.length).toBeGreaterThan(0);
    
    // Check for specific cards
    const blackLotus = cards.find(card => card.id === '1');
    expect(blackLotus).toBeDefined();
    expect(blackLotus?.name).toBe('Black Lotus');
    expect(blackLotus?.manaCost).toBe('{0}');
    
    const lightningBolt = cards.find(card => card.id === '2');
    expect(lightningBolt).toBeDefined();
    expect(lightningBolt?.name).toBe('Lightning Bolt');
    expect(lightningBolt?.manaCost).toBe('{R}');
  });

  it('should have all required properties for each card', () => {
    const cards = get(galleryCards);
    cards.forEach(card => {
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('manaCost');
      expect(card).toHaveProperty('imageUrl');
      expect(card).toHaveProperty('selected');
    });
  });
});