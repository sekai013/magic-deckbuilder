<script lang="ts">
  import { onMount } from 'svelte';
  import DeckBuilder from '../components/DeckBuilder.svelte';
  import { getDeckCards, getGalleryCards } from '$lib/state.svelte'
  import { loadDeckCards } from '../adapters/deck/static.svelte';
  import { loadGalleryCards } from '../adapters/gallery/scryfall.svelte';

  // Load deck cards immediately
  loadDeckCards();
  
  // Load gallery cards on mount
  onMount(async () => {
    try {
      // Load cards using the Scryfall adapter
      await loadGalleryCards({} as any, {} as any);
    } catch (err) {
      console.error('Error loading cards from Scryfall:', err);
    }
  });
</script>

<div class="app-container">
  <DeckBuilder galleryCards={getGalleryCards()} deckCards={getDeckCards()} />
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
