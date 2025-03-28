<script lang="ts">
  import Card from './Card.svelte';
  import type { Card as CardType } from '$lib/types';

  // Define props
  export let cards: CardType[] = [];
</script>

<div class="card-list" data-testid="card-list">
  {#each cards as card (card.id)}
    <div class="card-wrapper" data-testid="card-item">
      <Card {card} />
    </div>
  {/each}
</div>

<style>
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    width: 100%;
  }

  .card-wrapper {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .card-list {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 15px;
      padding: 15px;
    }
  }
</style>