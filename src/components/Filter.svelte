<script lang="ts">
  // Define props
  export let searchText: string = '';
  
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

<div class="filter-container">
  <h3>Filter Cards</h3>
  
  <div class="filter-layout">
    <div class="color-filter">
      <label>Filter by Color</label>
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
    
    <div class="mana-value-filter">
      <label>Mana Value</label>
      <button class="mana-value-button" title="Filter by Mana Value">
        <span class="mana-value-symbol">{'{X}'}</span>
      </button>
    </div>
    
    <div class="search-filter">
      <label for="card-search">Search Cards</label>
      <div class="search-input-container">
        <input
          type="text"
          id="card-search"
          placeholder="Card name, text or type..."
          bind:value={searchText}
        />
        <button class="reset-button" title="Reset Filters">Reset</button>
      </div>
    </div>
  </div>
</div>

<style>
  .filter-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 18px;
    color: #333;
  }
  
  .filter-layout {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
  }
  
  .color-filter {
    flex: 0 0 auto;
  }
  
  .mana-value-filter {
    flex: 0 0 auto;
    margin: 0 10px;
  }
  
  .search-filter {
    flex: 1;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
  }
  
  .search-input-container {
    display: flex;
    gap: 8px;
  }
  
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: white;
  }
  
  input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
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
  
  .mana-value-button {
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
  
  .mana-value-button:hover {
    background-color: #f0f0f0;
  }
  
  .mana-value-symbol {
    font-size: 16px;
    font-weight: bold;
    color: #555;
  }
  
  .reset-button {
    padding: 0 16px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    background-color: transparent;
    color: #555;
    border: 1px solid #ddd;
    white-space: nowrap;
  }
  
  .reset-button:hover {
    background-color: #f0f0f0;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .filter-layout {
      flex-direction: column;
      gap: 16px;
    }
    
    .color-options {
      gap: 6px;
    }
    
    .color-button, .mana-value-button {
      width: 36px;
      height: 36px;
    }
    
    .mana-value-filter {
      margin: 0;
    }
    
    .search-input-container {
      flex-direction: column;
      gap: 8px;
    }
    
    .reset-button {
      width: 100%;
      padding: 8px 0;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .filter-container {
      background-color: #333;
    }
    
    h3 {
      color: #f0f0f0;
    }
    
    label {
      color: #ccc;
    }
    
    input {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .color-button, .mana-value-button {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .color-button:hover, .mana-value-button:hover {
      background-color: #555;
    }
    
    .mana-value-symbol {
      color: #ccc;
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
    
    input {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .reset-button {
      color: #ccc;
      border-color: #555;
    }
    
    .reset-button:hover {
      background-color: #444;
    }
  }
</style>