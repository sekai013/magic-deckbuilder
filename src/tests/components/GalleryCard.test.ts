import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from 'svelte';
import GalleryCard from '../../components/GalleryCard.svelte';
import * as stateSvelte from '../../lib/state.svelte';
import type { Card } from '../../lib/types';

// Mock the addCardToDeck function
vi.mock('../../lib/state.svelte', () => ({
  addCardToDeck: vi.fn().mockResolvedValue(undefined),
  // Include other functions that might be imported elsewhere
  getGalleryCards: vi.fn(),
  getDeckCards: vi.fn(),
  updateGalleryCards: vi.fn(),
  updateDeckCards: vi.fn(),
  addCardToDeckById: vi.fn()
}));

describe('GalleryCard Component', () => {
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

  it('should call addCardToDeck when clicked', async () => {
    // Skip this test if we're in a server environment
    if (typeof window === 'undefined') {
      return;
    }
    
    // Create a container for the component
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    // Mount the component
    const instance = mount(GalleryCard, {
      target: container,
      props: { card: sampleCard }
    });
    
    try {
      // Find the card element
      const cardElement = container.querySelector('.card');
      expect(cardElement).not.toBeNull();
      
      // Click the card
      if (cardElement) {
        cardElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      
      // Wait for any promises to resolve
      await vi.waitFor(() => {
        // Verify addCardToDeck was called with the correct card
        expect(stateSvelte.addCardToDeck).toHaveBeenCalledTimes(1);
        expect(stateSvelte.addCardToDeck).toHaveBeenCalledWith(sampleCard);
      });
    } finally {
      // Clean up - in Svelte 5, we don't need to call $destroy explicitly
      // The component will be garbage collected when the container is removed
      container.remove();
    }
  });
});