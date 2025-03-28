<script lang="ts">
  // Magic color options
  const colors = [
    { id: 'W', name: 'White', symbol: '☀️', selected: false },
    { id: 'U', name: 'Blue', symbol: '💧', selected: false },
    { id: 'B', name: 'Black', symbol: '💀', selected: false },
    { id: 'R', name: 'Red', symbol: '🔥', selected: false },
    { id: 'G', name: 'Green', symbol: '🌳', selected: false },
    { id: 'C', name: 'Colorless', symbol: '💎', selected: false },
    { id: 'M', name: 'Multicolor', symbol: '🔶', selected: false }
  ];
</script>

<div class="color-filter">
  <div class="color-options">
    {#each colors as color}
      <button
        class="color-button"
        class:selected={color.selected}
        title={color.name}
      >
        <span class="color-symbol">{color.symbol}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .color-filter {
    flex: 0 0 auto;
  }
  
  
  .color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .color-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .color-button:hover {
    background-color: #f0f0f0;
  }
  
  .color-button.selected {
    background-color: #4299e1;
    color: white;
    border-color: #4299e1;
  }
  
  /* Special styling for multicolor button */
  .color-button[title="Multicolor"] {
    background: linear-gradient(135deg, #f6e05e, #ed8936);
    border-color: #d69e2e;
  }
  
  .color-button[title="Multicolor"]:hover {
    background: linear-gradient(135deg, #ecc94b, #dd6b20);
  }
  
  .color-button[title="Multicolor"].selected {
    background: linear-gradient(135deg, #d69e2e, #c05621);
    border-color: #b7791f;
    color: white;
  }
  
  .color-symbol {
    font-size: 18px;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .color-options {
      gap: 6px;
    }
    
    .color-button {
      width: 36px;
      height: 36px;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .color-button {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .color-button:hover {
      background-color: #555;
    }
    
    /* Dark mode for multicolor button */
    .color-button[title="Multicolor"] {
      background: linear-gradient(135deg, #b7791f, #9c4221);
      border-color: #744210;
    }
    
    .color-button[title="Multicolor"]:hover {
      background: linear-gradient(135deg, #975a16, #7b341e);
    }
    
    .color-button[title="Multicolor"].selected {
      background: linear-gradient(135deg, #744210, #652b19);
      border-color: #5f370e;
    }
  }
</style>