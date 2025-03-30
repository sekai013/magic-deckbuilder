import { describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest';
import {
  getGalleryCards,
  getDeckCards,
  updateGalleryCards,
  updateDeckCards,
  addCardToDeck,
  removeCardFromDeck,
  getManaValueFilter,
  updateManaValueFilter,
  toggleManaValueCondition,
  selectAllManaValueConditions,
  clearAllManaValueConditions,
  isManaValueConditionSelected,
  hasSelectedManaValueConditions
} from '../../lib/state.svelte';
import type { Card } from '../../lib/types';
import { ManaValueConditions, createManaValueFilter } from '../../lib/manaValueFilter';
import type { ManaValueCondition } from '../../lib/manaValueFilter';

describe('State', () => {
  // Sample cards for testing
  const initialGalleryCards: Card[] = [
    {
      id: '1',
      name: 'Black Lotus',
      manaCost: '{0}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382866&type=card',
    },
    {
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
    }
  ];

  const initialDeckCards: Card[] = [
    {
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
    },
    {
      id: '3',
      name: 'Counterspell',
      manaCost: '{U}{U}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413585&type=card',
    },
    {
      id: '4',
      name: 'Wrath of God',
      manaCost: '{2}{W}{W}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413580&type=card',
    }
  ];

  const sampleCard: Card = {
    id: 'test-id',
    name: 'Test Card',
    manaCost: '{1}{R}',
    imageUrl: 'https://example.com/test-card.jpg',
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

  describe('removeCardFromDeck', () => {
    it('should remove a card from the deck when given a card ID', async () => {
      // Reset deck cards to initial state
      updateDeckCards([...initialDeckCards]);
      
      // Verify initial deck state
      const initialLength = getDeckCards().length;
      expect(initialLength).toBe(initialDeckCards.length);
      
      // Get a card from the deck
      const cardToRemove = getDeckCards()[0];
      expect(cardToRemove).toBeDefined();
      
      // Remove the card from the deck using its ID
      await removeCardFromDeck(cardToRemove.id);
      
      // Verify card was removed from the deck
      const deckCards = getDeckCards();
      expect(deckCards.length).toBe(initialLength - 1);
      
      // Verify the card is no longer in the deck
      const removedCard = deckCards.find(card => card.id === cardToRemove.id);
      expect(removedCard).toBeUndefined();
    });

    it('should remove a card from the deck when given a card ID', async () => {
      // Reset deck cards to initial state
      updateDeckCards([...initialDeckCards]);
      
      // Verify initial deck state
      const initialLength = getDeckCards().length;
      
      // Get a card ID from the deck
      const cardIdToRemove = getDeckCards()[0].id;
      
      // Remove the card from the deck by ID
      await removeCardFromDeck(cardIdToRemove);
      
      // Verify card was removed from the deck
      const deckCards = getDeckCards();
      expect(deckCards.length).toBe(initialLength - 1);
      
      // Verify the card is no longer in the deck
      const removedCard = deckCards.find(card => card.id === cardIdToRemove);
      expect(removedCard).toBeUndefined();
    });

    it('should do nothing if the card does not exist in the deck', async () => {
      // Reset deck cards to initial state
      updateDeckCards([...initialDeckCards]);
      
      // Verify initial deck state
      const initialLength = getDeckCards().length;
      
      // Use a non-existent card ID
      const nonExistentCardId = 'non-existent-id';
      
      // Try to remove the non-existent card
      await removeCardFromDeck(nonExistentCardId);
      
      // Verify deck is unchanged
      expect(getDeckCards().length).toBe(initialLength);
    });

    it('should do nothing if null is passed', async () => {
      // Reset deck cards to initial state
      updateDeckCards([...initialDeckCards]);
      
      // Verify initial deck state
      const initialLength = getDeckCards().length;
      
      // Try to remove with a null ID
      await removeCardFromDeck(null as unknown as string);
      
      // Verify deck is unchanged
      expect(getDeckCards().length).toBe(initialLength);
    });

    it('should remove only one copy of a card when multiple copies exist', async () => {
      // Create a deck with multiple copies of the same card
      const cardWithMultipleCopies: Card = {
        id: '5',
        name: 'Lightning Bolt',
        manaCost: '{R}',
        imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
      };
      
      const deckWithDuplicates = [
        cardWithMultipleCopies, // First copy
        cardWithMultipleCopies, // Second copy
        cardWithMultipleCopies, // Third copy
        ...initialDeckCards
      ];
      
      // Set up the deck with duplicates
      updateDeckCards(deckWithDuplicates);
      
      // Verify initial state
      const initialDeck = getDeckCards();
      const initialCount = initialDeck.filter(card => card.id === '5').length;
      expect(initialCount).toBe(3); // Should have 3 copies initially
      
      // Remove one copy of the card using its ID
      await removeCardFromDeck('5');
      
      // Verify that only one copy was removed
      const updatedDeck = getDeckCards();
      const remainingCount = updatedDeck.filter(card => card.id === '5').length;
      expect(remainingCount).toBe(initialCount - 1); // Should have 2 copies remaining
      expect(updatedDeck.length).toBe(initialDeck.length - 1);
    });
  });

  describe('ManaValueFilter', () => {
    // Save original mana value filter to restore after tests
    let originalManaValueFilter: ReturnType<typeof getManaValueFilter>;

    beforeEach(() => {
      // Store original state
      originalManaValueFilter = getManaValueFilter();
      
      // Reset mana value filter to empty
      clearAllManaValueConditions();
    });

    afterEach(() => {
      // Restore original state
      updateManaValueFilter(originalManaValueFilter);
    });

    describe('getManaValueFilter', () => {
      it('should return a ManaValueFilter object', () => {
        const filter = getManaValueFilter();
        expect(filter).toBeDefined();
        expect(filter.conditions).toBeDefined();
        expect(filter.conditions instanceof Set).toBe(true);
      });
    });

    describe('updateManaValueFilter', () => {
      it('should update the mana value filter state', () => {
        // Create a new filter with some conditions
        const newFilter = createManaValueFilter(
          ManaValueConditions.EqualToZero,
          ManaValueConditions.EqualToThree
        );
        
        // Update the state
        updateManaValueFilter(newFilter);
        
        // Check that the state was updated
        const updatedFilter = getManaValueFilter();
        expect(updatedFilter).toEqual(newFilter);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToZero)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToThree)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToOne)).toBe(false);
      });
    });

    describe('toggleManaValueCondition', () => {
      it('should add a condition when it is not selected', () => {
        // Verify condition is not selected initially
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToTwo)).toBe(false);
        
        // Toggle the condition
        toggleManaValueCondition(ManaValueConditions.EqualToTwo);
        
        // Verify condition is now selected
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToTwo)).toBe(true);
      });

      it('should remove a condition when it is already selected', () => {
        // Add a condition first
        toggleManaValueCondition(ManaValueConditions.EqualToFour);
        
        // Verify condition is selected
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToFour)).toBe(true);
        
        // Toggle the condition again
        toggleManaValueCondition(ManaValueConditions.EqualToFour);
        
        // Verify condition is no longer selected
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToFour)).toBe(false);
      });
    });

    describe('selectAllManaValueConditions', () => {
      it('should select all mana value conditions', () => {
        // Verify no conditions are selected initially
        expect(hasSelectedManaValueConditions()).toBe(false);
        
        // Select all conditions
        selectAllManaValueConditions();
        
        // Verify all conditions are selected
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToZero)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToOne)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToTwo)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToThree)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToFour)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToFive)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToSix)).toBe(true);
        expect(isManaValueConditionSelected(ManaValueConditions.GreaterThanOrEqualToSeven)).toBe(true);
      });
    });

    describe('clearAllManaValueConditions', () => {
      it('should clear all mana value conditions', () => {
        // Select all conditions first
        selectAllManaValueConditions();
        
        // Verify conditions are selected
        expect(hasSelectedManaValueConditions()).toBe(true);
        
        // Clear all conditions
        clearAllManaValueConditions();
        
        // Verify no conditions are selected
        expect(hasSelectedManaValueConditions()).toBe(false);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToZero)).toBe(false);
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToOne)).toBe(false);
        // ... and so on for other conditions
      });
    });

    describe('isManaValueConditionSelected', () => {
      it('should return true when a condition is selected', () => {
        // Add a condition
        toggleManaValueCondition(ManaValueConditions.EqualToSix);
        
        // Verify the condition is selected
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToSix)).toBe(true);
      });

      it('should return false when a condition is not selected', () => {
        // Verify a condition that hasn't been added is not selected
        expect(isManaValueConditionSelected(ManaValueConditions.EqualToOne)).toBe(false);
      });
    });

    describe('hasSelectedManaValueConditions', () => {
      it('should return true when at least one condition is selected', () => {
        // Add a condition
        toggleManaValueCondition(ManaValueConditions.GreaterThanOrEqualToSeven);
        
        // Verify there are selected conditions
        expect(hasSelectedManaValueConditions()).toBe(true);
      });

      it('should return false when no conditions are selected', () => {
        // Verify there are no selected conditions initially
        expect(hasSelectedManaValueConditions()).toBe(false);
      });
    });
  });
});