<script lang="ts">
  import DeckBuilder from '../components/DeckBuilder.svelte';
  import { galleryCards } from '../services/GalleryCardService';
  import { deckCards } from '../services/DeckCardService';
  import type { Card } from '$lib/types';
  
  // Subscribe to the stores
  let galleryCardsValue: Card[] = [];
  let deckCardsValue: Card[] = [];
  
  galleryCards.subscribe(value => {
    galleryCardsValue = value;
  });
  
  deckCards.subscribe(value => {
    deckCardsValue = value;
  });
</script>

<div class="app-container">
  <DeckBuilder galleryCards={galleryCardsValue} deckCards={deckCardsValue} />
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
