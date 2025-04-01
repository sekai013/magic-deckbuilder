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
  <div class="deck-builder-content">
    <section class="gallery-section">
      <Gallery cards={galleryCards} />
      
      <Filter bind:searchText />
    </section>
    
    <section class="deck-section">      
      <DeckList cards={deckCards} />
    </section>
  </div>
</div>

<style>
  .deck-builder {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  .deck-builder-content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1rem;
    align-items: start; /* Align items to the top */
  }

  .gallery-section {
    padding-right: 0.5rem;
    margin-bottom: 1rem;
    max-width: 100%;
    overflow-x: hidden; /* Prevent horizontal overflow at container level */
  }
  
  .deck-section {
    margin-bottom: 1rem;
    position: sticky;
    top: 0.5rem;
    max-height: calc(100vh - 120px); /* Slightly increased visible area */
    overflow-y: auto;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .deck-builder {
      padding: 1rem;
    }
  
    .deck-builder-content {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      height: auto;
    }
    
    .gallery-section {
      max-width: 100%;
      overflow-x: hidden;
    }
    
    .deck-section {
      position: static; /* Reset position on mobile */
      max-height: 400px; /* Smaller max height on mobile */
      overflow-y: auto;
      margin-top: 2rem;
      border-top: 1px solid #e2e8f0;
      padding-top: 1rem;
    }
  }

  /* Scrollbar styling */
  .gallery-section::-webkit-scrollbar,
  .deck-section::-webkit-scrollbar {
    width: 8px;
  }
  
  .gallery-section::-webkit-scrollbar-track,
  .deck-section::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }
  
  .gallery-section::-webkit-scrollbar-thumb,
  .deck-section::-webkit-scrollbar-thumb {
    background-color: #4299e1;
    border-radius: 4px;
  }
  
  .gallery-section,
  .deck-section {
    scrollbar-width: thin;
    scrollbar-color: #4299e1 #f0f0f0;
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .deck-section {
      border-top-color: #4a5568;
    }
    
    .gallery-section::-webkit-scrollbar-track,
    .deck-section::-webkit-scrollbar-track {
      background: #2d3748;
    }
  
    .gallery-section::-webkit-scrollbar-thumb,
    .deck-section::-webkit-scrollbar-thumb {
      background-color: #3182ce;
    }
    
    .gallery-section,
    .deck-section {
      scrollbar-color: #3182ce #2d3748;
    }
  }
</style>