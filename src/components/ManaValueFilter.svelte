<script lang="ts">
  import { ManaValueConditions, type ManaValueCondition } from '$lib/manaValueFilter';
  import {
    toggleManaValueCondition,
    selectAllManaValueConditions,
    clearAllManaValueConditions,
    isManaValueConditionSelected,
    hasSelectedManaValueConditions
  } from '$lib/state.svelte';
  
  // State to track if the filter panel is open
  let isOpen = $state(false);
  
  // Toggle the filter panel
  function togglePanel(): void {
    isOpen = !isOpen;
  }
  
  // Handle mana value option click
  function handleManaValueOptionClick(e: MouseEvent, value: ManaValueCondition): void {
    e.stopPropagation();
    toggleManaValueCondition(value);
  }

  // Handle select all button click
  function handleSelectAllClick(e: MouseEvent): void {
    e.stopPropagation();
    selectAllManaValueConditions();
  }

  // Handle clear button click
  function handleClearClick(e: MouseEvent): void {
    e.stopPropagation();
    clearAllManaValueConditions();
  }
  
  // Handle toggle with proper typing
  function handleToggle(e: MouseEvent): void {
    e.stopPropagation();
    togglePanel();
  }
  
  // Close the panel when clicking outside
  function handlePointerOutside(event: PointerEvent): void {
    const target = event.target as HTMLElement;
    const panel = document.querySelector('.mana-value-panel');
    const button = document.querySelector('.mana-value-button');

    if (panel && button && !panel.contains(target) && !button.contains(target)) {
      isOpen = false;
    }
  }
  
  // Add pointer outside listener when component is mounted
  $effect(() => {
    if (isOpen) {
      document.addEventListener('pointerdown', handlePointerOutside);
      return () => document.removeEventListener('pointerdown', handlePointerOutside);
    }
  });
  
  // Mana value options with display text
  const manaValues = [
    { value: ManaValueConditions.EqualToZero, display: '0' },
    { value: ManaValueConditions.EqualToOne, display: '1' },
    { value: ManaValueConditions.EqualToTwo, display: '2' },
    { value: ManaValueConditions.EqualToThree, display: '3' },
    { value: ManaValueConditions.EqualToFour, display: '4' },
    { value: ManaValueConditions.EqualToFive, display: '5' },
    { value: ManaValueConditions.EqualToSix, display: '6' },
    { value: ManaValueConditions.GreaterThanOrEqualToSeven, display: '7+' }
  ];
</script>

<div class="mana-value-filter">
  <button
    class="mana-value-button"
    class:active={isOpen}
    class:has-selection={hasSelectedManaValueConditions()}
    title="Filter by Mana Value"
    onclick={handleToggle}
    aria-expanded={isOpen}
    aria-controls="mana-value-panel"
  >
    <span class="mana-value-symbol">{'{X}'}</span>
    {#if hasSelectedManaValueConditions()}
      <span class="selection-indicator"></span>
    {/if}
  </button>
  
  {#if isOpen}
    <div class="mana-value-panel" id="mana-value-panel">
      <div class="panel-header">
        <h3>Mana Value</h3>
      </div>
      <div class="mana-value-options">
        {#each manaValues as { value, display }}
          <button
            class="mana-value-option"
            class:selected={isManaValueConditionSelected(value)}
            onclick={(e) => handleManaValueOptionClick(e, value)}
          >
            {display}
          </button>
        {/each}
      </div>
      <div class="panel-footer">
        <button class="select-all-button" onclick={handleSelectAllClick}>Select All</button>
        <button class="clear-button" onclick={handleClearClick}>Clear</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .mana-value-filter {
    flex: 0 0 auto;
    margin: 0 10px;
    position: relative;
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
  
  .mana-value-button.active {
    background-color: #e6f7ff;
    border-color: #1890ff;
  }
  
  .mana-value-button.has-selection {
    background-color: #e6f7ff;
    border-color: #1890ff;
  }
  
  .selection-indicator {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #1890ff;
  }
  
  .mana-value-symbol {
    font-size: 16px;
    font-weight: bold;
    color: #555;
  }
  
  .mana-value-panel {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
    width: 220px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 100;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .panel-header {
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .panel-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  
  .mana-value-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
    padding: 12px;
    gap: 8px;
    justify-items: center;
  }
  
  .mana-value-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    cursor: pointer;
    font-weight: 500;
    color: #333;
    transition: all 0.2s ease;
  }
  
  .mana-value-option:hover {
    background-color: #e6f7ff;
    border-color: #1890ff;
  }
  
  .mana-value-option.selected {
    background-color: #1890ff;
    border-color: #1890ff;
    color: white;
  }
  
  .panel-footer {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-top: 1px solid #f0f0f0;
  }
  
  .select-all-button,
  .clear-button {
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #f5f5f5;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
  }
  
  .select-all-button:hover,
  .clear-button:hover {
    background-color: #e6f7ff;
    border-color: #1890ff;
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
    
    .mana-value-panel {
      width: 250px;
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
    
    .mana-value-button.active {
      background-color: #177ddc;
      border-color: #177ddc;
    }
    
    .mana-value-button.has-selection {
      background-color: #177ddc;
      border-color: #177ddc;
    }
    
    .selection-indicator {
      background-color: #1890ff;
    }
    
    .mana-value-symbol {
      color: #ccc;
    }
    
    .mana-value-panel {
      background-color: #333;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    
    .panel-header {
      border-bottom-color: #444;
    }
    
    .panel-header h3 {
      color: #f0f0f0;
    }
    
    .mana-value-option {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .mana-value-option:hover {
      background-color: #177ddc;
      border-color: #177ddc;
    }
    
    .mana-value-option.selected {
      background-color: #177ddc;
      border-color: #177ddc;
      color: white;
    }
    
    .panel-footer {
      border-top-color: #444;
    }
    
    .select-all-button,
    .clear-button {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .select-all-button:hover,
    .clear-button:hover {
      background-color: #177ddc;
      border-color: #177ddc;
    }
  }
</style>
