import { describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest';
import { getGalleryCards, getDeckCards, updateGalleryCards, updateDeckCards, addCardToDeck } from '../../lib/state.svelte';
import type { Card } from '../../lib/types';

describe('State', () => {
  // Sample cards for testing
  const initialGalleryCards: Card[] = [
    {
      id: '1',
      name: 'Black Lotus',
      manaCost: '{0}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382866&type=card',
      selected: false
    },
    {
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
      selected: false
    }
  ];

  const initialDeckCards: Card[] = [
    {
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
      selected: false
    },
    {
      id: '3',
      name: 'Counterspell',
      manaCost: '{U}{U}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413585&type=card',
      selected: false
    },
    {
      id: '4',
      name: 'Wrath of God',
      manaCost: '{2}{W}{W}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413580&type=card',
      selected: false
    }
  ];

  const sampleCard: Card = {
    id: 'test-id',
    name: 'Test Card',
    manaCost: '{1}{R}',
    imageUrl: 'https://example.com/test-card.jpg',
    selected: false
  };

  // Save original state to restore after tests
  let originalGalleryCards: Card[];
  let originalDeckCards: Card[];

  // Initialize state before all tests
  beforeAll(() => {
    updateGalleryCards(initialGalleryCards);
    updateDeckCards(initialDeckCards);
  });

  // Reset state before each test
  beforeEach(() => {
    // Store original state
    originalGalleryCards = [...getGalleryCards()];
    originalDeckCards = [...getDeckCards()];
    
    // Reset gallery cards to initial state
    updateGalleryCards(initialGalleryCards.map((card: Card) => ({
      ...card,
      selected: false
    })));
    
    // Reset deck cards to initial state
    updateDeckCards([...initialDeckCards]);
  });

  // Restore original state after each test (for tests that modify it)
  afterEach(() => {
    updateGalleryCards(originalGalleryCards);
    updateDeckCards(originalDeckCards);
  });

  describe('getGalleryCards', () => {
    it('should return an array', () => {
      expect(Array.isArray(getGalleryCards())).toBe(true);
    });

    it('should contain initial cards', () => {
      const cards = getGalleryCards();
      expect(cards.length).toBe(initialGalleryCards.length);
      
      // Check for Black Lotus
      const blackLotus = cards.find((card: Card) => card.id === '1');
      expect(blackLotus).toBeDefined();
      expect(blackLotus?.name).toBe('Black Lotus');
      
      // Check for Lightning Bolt
      const lightningBolt = cards.find((card: Card) => card.id === '2');
      expect(lightningBolt).toBeDefined();
      expect(lightningBolt?.name).toBe('Lightning Bolt');
    });
  });

  describe('getDeckCards', () => {
    it('should return an array', () => {
      expect(Array.isArray(getDeckCards())).toBe(true);
    });

    it('should contain initial cards', () => {
      const cards = getDeckCards();
      expect(cards.length).toBe(initialDeckCards.length);
      
      // Count occurrences of each card
      const cardCounts = cards.reduce((acc: Record<string, number>, card: Card) => {
        acc[card.id] = (acc[card.id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // Check for expected counts
      expect(cardCounts['2']).toBe(1); // 1 Lightning Bolt
      expect(cardCounts['3']).toBe(1); // 1 Counterspell
      expect(cardCounts['4']).toBe(1); // 1 Wrath of God
    });
  });

  describe('updateGalleryCards', () => {
    it('should update the gallery cards state', () => {
      // Create a new array with one card
      const newCards = [sampleCard];
      
      // Update the state
      updateGalleryCards(newCards);
      
      // Check that the state was updated
      const updatedCards = getGalleryCards();
      expect(updatedCards.length).toBe(1);
      expect(updatedCards[0]).toEqual(sampleCard);
    });

    it('should handle empty arrays', () => {
      // Update with empty array
      updateGalleryCards([]);
      
      // Check that the state was updated
      expect(getGalleryCards().length).toBe(0);
    });

    it('should be reactive', () => {
      // Get initial state
      const initialCards = getGalleryCards();
      const initialLength = initialCards.length;
      
      // Add a new card
      const updatedCards = [...initialCards, sampleCard];
      updateGalleryCards(updatedCards);
      
      // Check that the state was updated
      const newCards = getGalleryCards();
      expect(newCards.length).toBe(initialLength + 1);
      expect(newCards[newCards.length - 1]).toEqual(sampleCard);
    });
  });

  describe('updateDeckCards', () => {
    it('should update the deck cards state', () => {
      // Create a new array with one card
      const newCards = [sampleCard];
      
      // Update the state
      updateDeckCards(newCards);
      
      // Check that the state was updated
      const updatedCards = getDeckCards();
      expect(updatedCards.length).toBe(1);
      expect(updatedCards[0]).toEqual(sampleCard);
    });

    it('should handle empty arrays', () => {
      // Update with empty array
      updateDeckCards([]);
      
      // Check that the state was updated
      expect(getDeckCards().length).toBe(0);
    });

    it('should be reactive', () => {
      // Get initial state
      const initialCards = getDeckCards();
      const initialLength = initialCards.length;
      
      // Add a new card
      const updatedCards = [...initialCards, sampleCard];
      updateDeckCards(updatedCards);
      
      // Check that the state was updated
      const newCards = getDeckCards();
      expect(newCards.length).toBe(initialLength + 1);
      expect(newCards[newCards.length - 1]).toEqual(sampleCard);
    });
  });

  describe('addCardToDeck', () => {
    it('should add a card to the deck when given a card object', async () => {
      // Reset deck cards to empty for this test
      updateDeckCards([]);
      
      // Verify deck is empty initially
      expect(getDeckCards().length).toBe(0);
      
      // Get the card to add
      const blackLotus = getGalleryCards().find(card => card.id === '1');
      expect(blackLotus).toBeDefined();
      
      // Add the card to the deck
      if (blackLotus) {
        await addCardToDeck(blackLotus);
      }
      
      // Verify card was added to the deck
      const deckCards = getDeckCards();
      expect(deckCards.length).toBe(1);
      
      // Verify the correct card was added
      const addedCard = deckCards[0];
      expect(addedCard.id).toBe('1');
      expect(addedCard.name).toBe('Black Lotus');
    });

    it('should not modify the original card in the gallery', async () => {
      // Reset deck cards to empty for this test
      updateDeckCards([]);
      
      // Get the original card from the gallery
      const originalCard = getGalleryCards().find(card => card.id === '1');
      expect(originalCard).toBeDefined();
      
      // Add the card to the deck
      if (originalCard) {
        await addCardToDeck(originalCard);
      }
      
      // Verify the card in the gallery is unchanged
      const galleryCard = getGalleryCards().find(card => card.id === '1');
      expect(galleryCard).toEqual(originalCard);
    });

    it('should add a copy of the card, not a reference', async () => {
      // Reset deck cards to empty for this test
      updateDeckCards([]);
      
      // Get the card to add
      const blackLotus = getGalleryCards().find(card => card.id === '1');
      expect(blackLotus).toBeDefined();
      
      // Add the card to the deck
      if (blackLotus) {
        await addCardToDeck(blackLotus);
      }
      
      // Get the card from the gallery and the deck
      const galleryCard = getGalleryCards().find(card => card.id === '1');
      const deckCard = getDeckCards()[0];
      
      // Modify the deck card
      deckCard.selected = true;
      
      // Verify the gallery card is unchanged
      expect(galleryCard?.selected).toBe(false);
    });

    it('should do nothing if null is passed', async () => {
      // Reset deck cards to empty for this test
      updateDeckCards([]);
      
      // Verify deck is empty initially
      expect(getDeckCards().length).toBe(0);
      
      // Try to add a null card
      await addCardToDeck(null as unknown as Card);
      
      // Verify deck is still empty
      expect(getDeckCards().length).toBe(0);
    });
  });
});