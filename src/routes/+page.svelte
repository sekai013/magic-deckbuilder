<script lang="ts">
  import { onMount } from 'svelte';
  import DeckBuilder from '../components/DeckBuilder.svelte';
  import { getDeckCards, getGalleryCards, getColorFilter, getManaValueFilter } from '$lib/state.svelte'
  import { loadDeckCards } from '../adapters/deck/static.svelte';
  import { loadGalleryCards } from '../adapters/gallery/scryfall.svelte';

  // State for tracking filter changes
  let previousColorFilter = JSON.stringify(getColorFilter());
  let previousManaValueFilter = JSON.stringify(getManaValueFilter());
  let isLoading = false;

  // Load deck cards immediately
  loadDeckCards();
  
  // Function to load gallery cards
  async function loadCards() {
    if (isLoading) return;
    
    try {
      isLoading = true;
      // Load cards using the Scryfall adapter
      await loadGalleryCards(getColorFilter(), getManaValueFilter());
    } catch (err) {
      console.error('Error loading cards from Scryfall:', err);
    } finally {
      isLoading = false;
    }
  }
  
  // Load gallery cards on mount
  onMount(() => {
    loadCards();
  });
  
  // Watch for changes in colorFilter and manaValueFilter
  $effect(() => {
    const currentColorFilter = JSON.stringify(getColorFilter());
    const currentManaValueFilter = JSON.stringify(getManaValueFilter());
    
    // Check if filters have changed
    if (currentColorFilter !== previousColorFilter ||
        currentManaValueFilter !== previousManaValueFilter) {
      
      // Update previous values
      previousColorFilter = currentColorFilter;
      previousManaValueFilter = currentManaValueFilter;
      
      // Reload cards with new filters
      loadCards();
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
