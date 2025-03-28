<script lang="ts">
  import Gallery from './Gallery.svelte';
  import DeckList from './DeckList.svelte';
  import Filter from './Filter.svelte';
  import type { Card } from '$lib/types';

  // Props
  export let galleryCards: Card[] = [];
  export let deckCards: Card[] = [];
  
  // Filter state
  let searchText = '';
</script>

<div class="deck-builder">
  <div class="deck-builder-header">
    <h1>Magic: The Gathering Deckbuilder</h1>
  </div>
  
  <div class="deck-builder-content">
    <section class="gallery-section">
      <h2>Card Gallery</h2>
      <p>Browse through the collection of Magic: The Gathering cards.</p>
      
      <div class="stats">
        <p>Total Cards: {galleryCards.length}</p>
        <p>Selected Cards: {galleryCards.filter(card => card.selected).length}</p>
      </div>
      
      <Gallery cards={galleryCards} />
      
      <Filter bind:searchText />
    </section>
    
    <section class="deck-section">
      <h2>Your Deck</h2>
      <p>Cards in your current deck.</p>
      
      <DeckList cards={deckCards} />
    </section>
  </div>
</div>

<style>
  .deck-builder {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .deck-builder-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .deck-builder-header h1 {
    font-size: 2.5rem;
    color: #333;
    margin: 0;
  }

  .deck-builder-content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
  }

  .gallery-section, .deck-section {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #444;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    background-color: #f0f0f0;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .deck-builder {
      padding: 1rem;
    }

    .deck-builder-header h1 {
      font-size: 2rem;
    }

    .deck-builder-content {
      grid-template-columns: 1fr;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .deck-builder-header h1, h2 {
      color: #f0f0f0;
    }

    .stats {
      background-color: #3a3a3a;
      color: #f0f0f0;
    }
  }
</style>