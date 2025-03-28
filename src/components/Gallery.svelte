<script lang="ts">
  import GalleryCard from './GalleryCard.svelte';
  import type { Card as CardType } from '$lib/types';

  // Define props
  export let cards: CardType[] = [];
</script>

<div class="gallery" data-testid="gallery">
  {#each cards as card (card.id)}
    <div class="gallery-item" data-testid="gallery-item">
      <GalleryCard {card} />
    </div>
  {/each}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    width: 100%;
  }

  .gallery-item {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .gallery {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 15px;
      padding: 15px;
    }
  }
</style>