<script lang="ts">
  import GalleryCard from './GalleryCard.svelte';
  import type { Card as CardType } from '$lib/types';

  // Define props
  export let cards: CardType[] = [];
</script>

<div class="gallery-container">
  <div class="gallery" data-testid="gallery">
    {#each cards as card (card.id)}
      <div class="gallery-item" data-testid="gallery-item">
        <GalleryCard {card} />
      </div>
    {/each}
  </div>
</div>

<style>
  .gallery-container {
    width: 100%;
    height: 500px; /* Slightly reduced fixed height */
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #f8fafc;
    padding: 10px;
    margin-bottom: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .gallery {
    display: grid;
    grid-template-rows: repeat(2, 1fr); /* Two equal rows */
    grid-auto-flow: column;
    grid-auto-columns: 180px; /* Slightly smaller cards */
    gap: 12px; /* Reduced gap */
    padding: 2px;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden; /* Hide vertical overflow */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #4299e1 #f0f0f0;
  }

  .gallery::-webkit-scrollbar {
    height: 8px;
  }

  .gallery::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }

  .gallery::-webkit-scrollbar-thumb {
    background-color: #4299e1;
    border-radius: 4px;
  }

  .gallery-item {
    cursor: pointer;
    transition: transform 0.2s ease;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gallery-item:hover {
    transform: translateY(-5px);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .gallery-container {
      height: 450px;
      padding: 12px;
    }
    
    .gallery {
      grid-auto-columns: 160px;
      gap: 15px;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .gallery-container {
      background-color: #1a202c;
      border-color: #2d3748;
    }
    
    .gallery {
      scrollbar-color: #3182ce #2d3748;
    }

    .gallery::-webkit-scrollbar-track {
      background: #2d3748;
    }

    .gallery::-webkit-scrollbar-thumb {
      background-color: #3182ce;
    }
  }
</style>