import { writable } from 'svelte/store';
import type { Card } from '$lib/types';

// Define the initial gallery cards
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

// Create and export the gallery cards store
export const galleryCards = writable<Card[]>(initialGalleryCards);

// In the future, this service could be expanded to include:
// - Loading gallery cards from an API
// - Filtering gallery cards
// - etc.