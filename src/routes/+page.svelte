<script lang="ts">
  import Card from '../components/Card.svelte';
  import type { Card as CardType } from '$lib/types';
  
  // Sample card data
  let cards = $state<CardType[]>([
    {
      id: '1',
      name: 'Black Lotus',
      manaCost: '{0}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382866&type=card',
      selected: false
    },
    {
      id: '2',
      name: 'Lightning Bolt',
      manaCost: '{R}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442125&type=card',
      selected: false
    },
    {
      id: '3',
      name: 'Counterspell',
      manaCost: '{U}{U}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413585&type=card',
      selected: false
    },
    {
      id: '4',
      name: 'Wrath of God',
      manaCost: '{2}{W}{W}',
      imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413580&type=card',
      selected: false
    }
  ]);
</script>

<main class="container">
  <h1>Magic: The Gathering Deckbuilder</h1>
  
  <section class="card-section">
    <h2>Card Gallery</h2>
    <p>Browse through the collection of Magic: The Gathering cards.</p>
    
    <div class="card-grid">
      {#each cards as card (card.id)}
        <div class="card-container">
          <Card {card} />
        </div>
      {/each}
    </div>
  </section>
</main>

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
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #333;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #444;
  }
  
  .card-section {
    margin-bottom: 3rem;
  }
  
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .card-container {
    display: flex;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    .card-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    
    .container {
      padding: 1rem;
    }
    
    h1 {
      font-size: 2rem;
    }
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
    
    h1, h2 {
      color: #f0f0f0;
    }
  }
</style>
