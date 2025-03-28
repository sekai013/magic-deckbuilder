import { updateGalleryCards } from '$lib/state.svelte';
import type { Card } from '$lib/types';

// Define the initial gallery cards
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

export async function loadGalleryCards() {
  updateGalleryCards(initialGalleryCards);
}
