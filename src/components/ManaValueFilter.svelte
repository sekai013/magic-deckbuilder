<script lang="ts">
  // This component will be expanded in the future to show detailed mana value filtering options
</script>

<div class="mana-value-filter">
  <button class="mana-value-button" title="Filter by Mana Value">
    <span class="mana-value-symbol">{'{X}'}</span>
  </button>
</div>

<style>
  .mana-value-filter {
    flex: 0 0 auto;
    margin: 0 10px;
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
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .mana-value-filter {
      margin: 0;
    }
    
    .mana-value-button {
      width: 36px;
      height: 36px;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .mana-value-button {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .mana-value-button:hover {
      background-color: #555;
    }
    
    .mana-value-symbol {
      color: #ccc;
    }
  }
</style>