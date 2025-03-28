<script lang="ts">
  import DeckBuilder from '../components/DeckBuilder.svelte';
  import type { Card as CardType } from '$lib/types';
  
  // Sample card data
  let galleryCards = $state<CardType[]>([
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
  ]);
  
  // Sample deck cards with multiple copies
  let deckCards = $state<CardType[]>([
    // 4 copies of Lightning Bolt
    {
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
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
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
      selected: false
    },
    {
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
      selected: false
    },
    // 2 copies of Counterspell
    {
      id: '3',
      name: 'Counterspell',
      manaCost: '{U}{U}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413585&type=card',
      selected: false
    },
    {
      id: '3',
      name: 'Counterspell',
      manaCost: '{U}{U}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413585&type=card',
      selected: false
    },
    // 1 copy of Wrath of God
    {
      id: '4',
      name: 'Wrath of God',
      manaCost: '{2}{W}{W}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413580&type=card',
      selected: false
    }
  ]);
</script>

<div class="app-container">
  <DeckBuilder {galleryCards} {deckCards} />
</div>

<style>
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: #0f0f0f;
    background-color: #f6f6f6;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  .app-container {
    width: 100%;
    min-height: 100vh;
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
</style>
