<script lang="ts">
  import type { Card } from '$lib/types';
  import { addCardToDeck } from '$lib/state.svelte';

  // Define props
  export let card: Card;

  let component: HTMLDivElement;

  // Handle card click
  async function handleCardClick() {
    await addCardToDeck(card);
  }

  // Handle key press (for accessibility)
  async function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      await addCardToDeck(card);
    }
  }

  function handleMouseLeave(event: MouseEvent) {
    component.blur();
  }
</script>

<div 
  class="card" 
  on:click={handleCardClick}
  on:keydown={handleKeyPress}
  on:mouseleave={handleMouseLeave}
  bind:this={component}
  role="button"
  tabindex="0"
>
  <div class="card-inner">
    <!-- Card image -->
    <div class="card-image-container">
      <img src={card.imageUrl} alt={card.name} class="card-image" />
    </div>    
  </div>
</div>

<style>
  .card {
    position: relative;
    width: 170px;
    height: 235px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background-color: #000;
    user-select: none;
    cursor: pointer;
    margin: 0 auto; /* Center card in its container */
  }
  
  .card:hover, .card:focus {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    outline: none; /* Remove default focus outline */
    z-index: 1; /* Ensure hovered card appears above others */
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .card-image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .card:hover .card-image, .card:focus .card-image {
    transform: scale(1.05);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .card {
      width: 130px;
      height: 180px;
    }    
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }
    
    .card:hover, .card:focus {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
  }
</style>