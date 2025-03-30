import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from 'svelte';
import DeckListCard from '../../components/DeckListCard.svelte';
import * as stateSvelte from '../../lib/state.svelte';
import type { Card } from '../../lib/types';

// Mock the removeCardFromDeck function
vi.mock('../../lib/state.svelte', () => ({
  removeCardFromDeck: vi.fn().mockResolvedValue(undefined),
  // Include other functions that might be imported elsewhere
  getGalleryCards: vi.fn(),
  getDeckCards: vi.fn(),
  updateGalleryCards: vi.fn(),
  updateDeckCards: vi.fn(),
  addCardToDeck: vi.fn()
}));

describe('DeckListCard Component', () => {
  // Sample card for testing
  const sampleCard: Card = {
    id: '1',
    name: 'Black Lotus',
    manaCost: '{0}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382866&type=card',
  };

  beforeEach(() => {
    // Clear mock calls before each test
    vi.clearAllMocks();
    
    // Set up the DOM environment
    document.body.innerHTML = '';
  });

  it('should call removeCardFromDeck when clicked', async () => {
    // Create a container for the component
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    // Mount the component
    const instance = mount(DeckListCard, {
      target: container,
      props: { 
        card: sampleCard,
        count: 2 // Testing with 2 copies of the card
      }
    });
    
    try {
      // Find the card element
      const cardElement = container.querySelector('.deck-list-card');
      expect(cardElement).not.toBeNull();
      
      // Click the card
      if (cardElement) {
        cardElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      
      // Wait for any promises to resolve
      await vi.waitFor(() => {
        // Verify removeCardFromDeck was called with the correct card ID
        expect(stateSvelte.removeCardFromDeck).toHaveBeenCalledTimes(1);
        expect(stateSvelte.removeCardFromDeck).toHaveBeenCalledWith(sampleCard.id);
      });
    } finally {
      // Clean up - in Svelte 5, we don't need to call $destroy explicitly
      // The component will be garbage collected when the container is removed
      container.remove();
    }
  });

  it('should display the correct card count and name', () => {    
    // Create a container for the component
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    // Mount the component with a count of 3
    const instance = mount(DeckListCard, {
      target: container,
      props: { 
        card: sampleCard,
        count: 3
      }
    });
    
    try {
      // Check that the count is displayed correctly
      const countElement = container.querySelector('.card-count');
      expect(countElement?.textContent).toBe('3x');
      
      // Check that the card name is displayed correctly
      const nameElement = container.querySelector('.card-name');
      expect(nameElement?.textContent).toBe('Black Lotus');
      
      // Check that the mana cost is displayed correctly
      const manaElement = container.querySelector('.card-mana');
      expect(manaElement?.textContent).toBe('{0}');
    } finally {
      container.remove();
    }
  });
});