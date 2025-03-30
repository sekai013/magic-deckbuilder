<script lang="ts">
  import type { Card } from '$lib/types';
  import { removeCardFromDeck } from '$lib/state.svelte';

  // Define props
  export let card: Card;
  export let count: number = 1;

  // Handle card removal
  function removeCard() {
    removeCardFromDeck(card.id);
  }
  
  // Handle keyboard events for accessibility
  function handleKeydown(event: KeyboardEvent) {
    // Remove card when Enter or Space is pressed
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      removeCard();
    }
  }
</script>

<button
  type="button"
  class="deck-list-card"
  data-testid="deck-list-card"
  on:click={removeCard}
  on:keydown={handleKeydown}
  aria-label="Remove {card.name} from deck"
>
  <span class="card-count">{count}x</span>
  <span class="card-name">{card.name}</span>
  <span class="card-mana">{card.manaCost}</span>
</button>

<style>
  .deck-list-card {
    width: 100%;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    text-align: left;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .deck-list-card:hover {
    background-color: #e9e9e9;
  }

  .deck-list-card:focus {
    outline: 2px solid #007bff;
    outline-offset: 1px;
  }

  .card-count {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-right: 8px;
    min-width: 24px;
  }

  .card-name {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    flex-grow: 1;
  }

  .card-mana {
    font-size: 12px;
    color: #666;
    margin-left: 8px;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .deck-list-card {
      background-color: #333;
    }

    .deck-list-card:hover {
      background-color: #444;
    }

    .deck-list-card:focus {
      outline-color: #3498db;
    }

    .card-count {
      color: #aaa;
    }

    .card-name {
      color: #f0f0f0;
    }

    .card-mana {
      color: #bbb;
    }
  }
</style>