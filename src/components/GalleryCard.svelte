<script lang="ts">
  import type { Card } from '$lib/types';

  // Define props
  export let card: Card;
</script>

<div class="card" class:selected={card.selected}>
  <div class="card-inner">
    <!-- Card image -->
    <div class="card-image-container">
      <img src={card.imageUrl} alt={card.name} class="card-image" />
    </div>
    
    <!-- Card info overlay -->
    <div class="card-info">
      <div class="card-header">
        <h3 class="card-name">{card.name}</h3>
        <div class="card-mana-cost">{card.manaCost}</div>
      </div>
    </div>
  </div>
</div>

<style>
  .card {
    position: relative;
    width: 200px;
    height: 280px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background-color: #000;
    user-select: none;
  }
  
  .card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .card.selected {
    box-shadow: 0 0 0 3px #4299e1, 0 5px 15px rgba(0, 0, 0, 0.3);
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
  
  .card:hover .card-image {
    transform: scale(1.05);
  }
  
  .card-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 8px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
    color: white;
    z-index: 1;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-name {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
  }
  
  .card-mana-cost {
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .card {
      width: 160px;
      height: 224px;
    }
    
    .card-name, .card-mana-cost {
      font-size: 12px;
    }
  }
</style>