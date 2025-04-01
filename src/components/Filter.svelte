<script lang="ts">
  import ColorFilter from './ColorFilter.svelte';
  import ManaValueFilter from './ManaValueFilter.svelte';
  import TextFilter from './TextFilter.svelte';
  import FormatFilter from './FormatFilter.svelte';
  
  // Define props
  export let searchText: string = '';
</script>

<div class="filter-container">
  <h3>Filter Cards</h3>
  
  <div class="filter-layout">
    <ColorFilter />
    <ManaValueFilter />
    <FormatFilter />
    <TextFilter bind:searchText />
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
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .filter-layout {
      flex-direction: column;
      gap: 16px;
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
  }
</style>