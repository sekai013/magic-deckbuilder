<script lang="ts">
  import type { Card } from '$lib/types';

  // Define props
  export let card: Card;
  export let count: number = 1;
</script>

<div class="deck-list-card" data-testid="deck-list-card">
  <span class="card-count">{count}x</span>
  <span class="card-name">{card.name}</span>
  <span class="card-mana">{card.manaCost}</span>
</div>

<style>
  .deck-list-card {
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
  }

  .deck-list-card:hover {
    background-color: #e9e9e9;
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