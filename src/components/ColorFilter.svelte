<script lang="ts">
  import { toggleColor, changeColorFilterType, isSelectedValue, isSelectedFilterType } from '../lib/state.svelte';
  import { FilterTypes } from '../lib/colorFilter';
  import { Colorless, Colors, type SingleColor } from '../lib/colors';
  import { onMount, onDestroy } from 'svelte';

  // Filter type options with descriptions
  const filterTypeOptions = [
    {
      type: FilterTypes.Exact,
      symbol: '=',
      description: 'Exactly these colors',
    },
    {
      type: FilterTypes.AtLeast,
      symbol: '>=',
      description: 'At least these colors',
    },
    {
      type: FilterTypes.AtMost,
      symbol: '<=',
      description: 'At most these colors',
    }
  ];

  // Magic color options
  const colors = [
    { id: 'W', name: 'White', symbol: '☀️', value: Colors.White },
    { id: 'U', name: 'Blue', symbol: '💧', value: Colors.Blue },
    { id: 'B', name: 'Black', symbol: '💀', value: Colors.Black },
    { id: 'R', name: 'Red', symbol: '🔥', value: Colors.Red },
    { id: 'G', name: 'Green', symbol: '🌳', value: Colors.Green },
    { id: 'C', name: 'Colorless', symbol: '💎', value: Colorless }
  ];

  // State for filter type panel
  let isFilterTypePanelOpen = false;
  
  // Handle click outside to close panel
  function handleClickOutside(event: MouseEvent) {
    const panel = document.querySelector('.filter-type-panel');
    const button = document.querySelector('.filter-type-button');
    
    if (panel && button && !panel.contains(event.target as Node) && !button.contains(event.target as Node)) {
      isFilterTypePanelOpen = false;
    }
  }
  
  // Set up and clean up click outside listener
  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });
  
  onDestroy(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  // Handle color button click
  function handleColorClick(colorValue: SingleColor | Colorless): void {
    toggleColor(colorValue);
  }

  // Toggle filter type panel
  function toggleFilterTypePanel(): void {
    isFilterTypePanelOpen = !isFilterTypePanelOpen;
  }
  
  // Select filter type
  function selectFilterType(filterType: typeof FilterTypes[keyof typeof FilterTypes]): void {
    changeColorFilterType(filterType);
    isFilterTypePanelOpen = false;
  }

  // Get the current filter type symbol
  function getCurrentFilterTypeSymbol(): string {
    const option = filterTypeOptions.find(option => isSelectedFilterType(option.type));
    return option ? option.symbol : '=';
  }
</script>

<div class="color-filter">
  <div class="color-options">
    {#each colors as color}
      <button
        class="color-button"
        class:selected={isSelectedValue(color.value)}
        title={color.name}
        on:click={() => handleColorClick(color.value)}
      >
        <span class="color-symbol">{color.symbol}</span>
      </button>
    {/each}
    
    <div class="filter-type-container">
      <button
        class="filter-type-button"
        on:click={toggleFilterTypePanel}
        title="Change filter type"
      >
        <span class="filter-type-symbol">{getCurrentFilterTypeSymbol()}</span>
      </button>
      
      {#if isFilterTypePanelOpen}
        <div class="filter-type-panel">
          <h3>Filter Type</h3>
          {#each filterTypeOptions as option}
            <div
              class="filter-type-option"
              class:selected={isSelectedFilterType(option.type)}
              on:click={() => selectFilterType(option.type)}
              on:keydown={(e) => e.key === 'Enter' && selectFilterType(option.type)}
              tabindex="0"
              role="button"
              aria-pressed={isSelectedFilterType(option.type)}
            >
              <span class="filter-type-option-symbol">{option.symbol}</span>
              <span class="filter-type-option-description">{option.description}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .color-filter {
    flex: 0 0 auto;
  }
  
  .filter-type-container {
    position: relative;
  }
  
  .filter-type-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #4299e1;
    color: white;
    border: 1px solid #4299e1;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: bold;
    margin-left: 8px;
  }
  
  .filter-type-button:hover {
    background-color: #3182ce;
    border-color: #3182ce;
  }
  
  .filter-type-symbol {
    font-size: 16px;
  }
  
  .filter-type-panel {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 8px;
    width: 280px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 12px;
    z-index: 10;
  }
  
  .filter-type-panel h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 16px;
    color: #2d3748;
  }
  
  .filter-type-option {
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
  }
  
  .filter-type-option:hover {
    background-color: #f7fafc;
  }
  
  .filter-type-option.selected {
    background-color: #ebf8ff;
  }
  
  .filter-type-option-symbol {
    display: inline-block;
    width: 30px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    font-family: monospace;
  }
    
  .filter-type-option-description {
    display: inline-block;
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
    .filter-type-button {
      background-color: #2b6cb0;
      border-color: #2c5282;
      color: #f0f0f0;
    }
    
    .filter-type-button:hover {
      background-color: #2c5282;
      border-color: #2a4365;
    }
    
    .filter-type-panel {
      background-color: #2d3748;
      border-color: #4a5568;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
    
    .filter-type-panel h3 {
      color: #f7fafc;
    }
    
    .filter-type-option:hover {
      background-color: #4a5568;
    }
    
    .filter-type-option.selected {
      background-color: #2c5282;
      border-left-color: #90cdf4;
    }
    
    .filter-type-option span {
      color: #f7fafc;
    }
    
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