<script lang="ts">
  import { selectSingleFormat, isFormatSelectedInFilter, getSelectedFormatFromFilter, getFormatFilter } from '../lib/state.svelte';
  import { Formats } from '../lib/format';
  import { loadGalleryCards } from '../adapters/gallery/scryfall.svelte';

  // Magic format options
  const formatOptions = [
    { id: 'standard', name: 'Standard', value: Formats.Standard },
    { id: 'modern', name: 'Modern', value: Formats.Modern },
    { id: 'legacy', name: 'Legacy', value: Formats.Legacy },
    { id: 'vintage', name: 'Vintage', value: Formats.Vintage },
    { id: 'commander', name: 'Commander', value: Formats.Commander },
    { id: 'pauper', name: 'Pauper', value: Formats.Pauper },
    { id: 'pioneer', name: 'Pioneer', value: Formats.Pioneer },
    { id: 'historic', name: 'Historic', value: Formats.Historic },
    { id: 'brawl', name: 'Brawl', value: Formats.Brawl }
  ];

  // Handle format selection change
  async function handleFormatChange(event: Event): Promise<void> {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;
    
    if (selectedValue === "") {
      // If "All Formats" is selected, clear the format filter
      selectSingleFormat(null);
    } else {
      // Find the format object that matches the selected value
      const selectedFormat = formatOptions.find(format => format.id === selectedValue)?.value;
      if (selectedFormat) {
        selectSingleFormat(selectedFormat);
      }
    }
    
    // Load gallery cards with the updated format filter
    await loadGalleryCards();
  }

  // Get the currently selected format ID
  $effect(() => {
    const selectedFormat = getSelectedFormatFromFilter();
    if (selectedFormat) {
      const selectedOption = formatOptions.find(option => option.value === selectedFormat);
      if (selectedOption) {
        const selectElement = document.getElementById('format-select') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = selectedOption.id;
        }
      }
    }
  });
</script>

<div class="format-filter">
  <div class="format-select-container">
    <select 
      id="format-select"
      class="format-select"
      onchange={handleFormatChange}
      aria-label="Select format"
    >
      <option value="">All Formats</option>
      {#each formatOptions as format}
        <option 
          value={format.id}
          selected={isFormatSelectedInFilter(format.value)}
        >
          {format.name}
        </option>
      {/each}
    </select>
  </div>
</div>

<style>
  .format-filter {
    flex: 0 0 auto;
    margin-bottom: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background-color: #f8fafc;
  }
  
  .format-select-container {
    width: 100%;
  }
  
  .format-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .format-select:hover {
    border-color: #4299e1;
  }
  
  .format-select:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .format-filter {
      background-color: #2d3748;
      border-color: #4a5568;
    }
    
    .format-select {
      background-color: #444;
      border-color: #555;
      color: #f0f0f0;
    }
    
    .format-select:hover {
      border-color: #4299e1;
    }
    
    .format-select:focus {
      border-color: #4299e1;
      box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
    }
    
    .format-select option {
      background-color: #444;
      color: #f0f0f0;
    }
  }
</style>