<script lang="ts">
  import DeckListCard from './DeckListCard.svelte';
  import type { Card } from '$lib/types';

  // Define props
  export let cards: Card[] = [];
  
  // Group cards by ID and count occurrences
  $: cardCounts = cards.reduce((acc, card) => {
    const existingCard = acc.find(item => item.card.id === card.id);
    if (existingCard) {
      existingCard.count += 1;
    } else {
      acc.push({ card, count: 1 });
    }
    return acc;
  }, [] as { card: Card, count: number }[]);
  
  // Calculate total cards
  $: totalCards = cards.length;
</script>

<div class="deck-list" data-testid="deck-list">
  <div class="deck-list-header">
    <h3>Deck ({totalCards} cards)</h3>
  </div>
  
  <div class="deck-list-content">
    {#if cards.length === 0}
      <div class="empty-deck">
        <p>Your deck is empty</p>
        <p class="hint">Add cards from the gallery</p>
      </div>
    {:else}
      {#each cardCounts as { card, count } (card.id)}
        <DeckListCard {card} {count} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .deck-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .deck-list-header {
    padding: 12px 16px;
    background-color: #e0e0e0;
    border-bottom: 1px solid #ddd;
  }

  .deck-list-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .deck-list-content {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
  }

  .empty-deck {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 150px;
    color: #888;
    text-align: center;
  }

  .empty-deck p {
    margin: 4px 0;
  }

  .hint {
    font-size: 14px;
    font-style: italic;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .deck-list {
      background-color: #2a2a2a;
    }

    .deck-list-header {
      background-color: #333;
      border-bottom-color: #444;
    }

    .deck-list-header h3 {
      color: #f0f0f0;
    }

    .empty-deck {
      color: #aaa;
    }
  }
</style>