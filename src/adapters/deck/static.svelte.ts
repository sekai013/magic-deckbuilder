import { updateDeckCards } from '$lib/state.svelte';
import type { Card } from '$lib/types';

// Define the initial deck cards
const initialDeckCards: Card[] = [
  // 4 copies of Lightning Bolt
  {
    id: '2',
    name: 'Lightning Bolt',
    manaCost: '{R}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
  },
  {
    id: '2',
    name: 'Lightning Bolt',
    manaCost: '{R}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
  },
  {
    id: '2',
    name: 'Lightning Bolt',
    manaCost: '{R}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
  },
  {
    id: '2',
    name: 'Lightning Bolt',
    manaCost: '{R}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
  },
  // 2 copies of Counterspell
  {
    id: '3',
    name: 'Counterspell',
    manaCost: '{U}{U}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413585&type=card',
  },
  {
    id: '3',
    name: 'Counterspell',
    manaCost: '{U}{U}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413585&type=card',
  },
  // 1 copy of Wrath of God
  {
    id: '4',
    name: 'Wrath of God',
    manaCost: '{2}{W}{W}',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413580&type=card',
  }
];

export async function loadDeckCards() {
  updateDeckCards(initialDeckCards);
}
