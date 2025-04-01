import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { flushSync, mount, unmount } from 'svelte';

// Mock the gallery adapter
vi.mock('../../adapters/gallery/scryfall.svelte', () => ({
  loadGalleryCards: vi.fn()
}));

// Mock the state functions
vi.mock('../../lib/state.svelte', () => ({
  getFormatFilter: vi.fn(() => ({ _type: 'NoFormatFilter' })),
  selectSingleFormat: vi.fn(),
  isFormatSelectedInFilter: vi.fn(() => false),
  getSelectedFormatFromFilter: vi.fn(() => null)
}));

import FormatFilter from '../../components/FormatFilter.svelte';
import * as state from '../../lib/state.svelte';
import { Formats } from '../../lib/format';
import * as scryfallAdapter from '../../adapters/gallery/scryfall.svelte';

describe('FormatFilter.svelte', () => {
  let component: {};

  beforeEach(() => {
    // Reset mocks before each test
    vi.mocked(state.getFormatFilter).mockReturnValue({ _type: 'NoFormatFilter' });
    vi.mocked(state.isFormatSelectedInFilter).mockReturnValue(false);
    vi.mocked(state.getSelectedFormatFromFilter).mockReturnValue(null);
    vi.mocked(scryfallAdapter.loadGalleryCards).mockResolvedValue();

    // Mount the component
    component = mount(FormatFilter, {
      target: document.body
    });
  });

  afterEach(() => {
    unmount(component);
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
    expect(document.body.querySelector('.format-filter')).not.toBeNull();
  });

  it('should render the filter title', () => {
    const title = document.body.querySelector('.filter-header h3');
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe('Format');
  });

  it('should render a select element with format options', () => {
    const select = document.body.querySelector('select.format-select');
    expect(select).not.toBeNull();
    
    const options = document.body.querySelectorAll('select.format-select option');
    // 9 format options + "All Formats" option
    expect(options.length).toBe(10);
    
    // Check that the first option is "All Formats"
    expect(options[0].textContent?.trim()).toBe('All Formats');
    expect((options[0] as HTMLOptionElement).value).toBe('');
    
    // Check that the other options are the format names
    expect(options[1].textContent?.trim()).toBe('Standard');
    expect(options[2].textContent?.trim()).toBe('Modern');
  });

  it('should call selectSingleFormat with the format when a format is selected', async () => {
    const select = document.body.querySelector('select.format-select') as HTMLSelectElement;
    expect(select).not.toBeNull();
    
    // Change the select value to "standard"
    select.value = 'standard';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Check if selectSingleFormat was called with the correct format
    expect(state.selectSingleFormat).toHaveBeenCalledWith(Formats.Standard);
  });

  it('should call selectSingleFormat with null when "All Formats" is selected', async () => {
    const select = document.body.querySelector('select.format-select') as HTMLSelectElement;
    expect(select).not.toBeNull();
    
    // First select a format
    select.value = 'modern';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Then select "All Formats"
    select.value = '';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Check if selectSingleFormat was called with null
    expect(state.selectSingleFormat).toHaveBeenCalledWith(null);
  });

  it('should select the correct option when a format is already selected', () => {
    // Mock getSelectedFormatFromFilter to return Standard
    vi.mocked(state.getSelectedFormatFromFilter).mockReturnValue(Formats.Standard);
    vi.mocked(state.isFormatSelectedInFilter).mockImplementation((format) => format === Formats.Standard);
    
    // Remount the component to reflect the new mock value
    unmount(component);
    component = mount(FormatFilter, {
      target: document.body
    });
    
    // Check that the Standard option is selected
    const options = document.body.querySelectorAll('select.format-select option');
    const standardOption = Array.from(options).find(option => option.textContent?.trim() === 'Standard') as HTMLOptionElement;
    expect(standardOption).toBeDefined();
    expect(standardOption?.selected).toBe(true);
  });

  it('should load gallery cards when format filter changes', async () => {
    const select = document.body.querySelector('select.format-select') as HTMLSelectElement;
    expect(select).not.toBeNull();
    
    // Change the select value to "standard"
    select.value = 'standard';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Check if loadGalleryCards was called
    expect(scryfallAdapter.loadGalleryCards).toHaveBeenCalled();
  });
});