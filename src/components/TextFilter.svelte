<script lang="ts">
  // Define props
  export let searchText: string = '';
</script>

<div class="search-filter">
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

<style>
  .search-filter {
    flex: 1;
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