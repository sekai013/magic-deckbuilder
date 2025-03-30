import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { flushSync, mount, unmount } from 'svelte';

// Mock the state functions
vi.mock('../../lib/state.svelte', () => ({
  getColorFilter: vi.fn(() => ({ type: 'Exact' })),
  toggleColor: vi.fn(),
  changeColorFilterType: vi.fn(),
  isSelectedValue: vi.fn(() => false),
  isSelectedFilterType: vi.fn((type) => type === 'Exact')
}));

import ColorFilter from '../../components/ColorFilter.svelte';
import * as state from '../../lib/state.svelte';
import { FilterTypes } from '../../lib/colorFilter';
import { Colors } from '../../lib/colors';

describe('ColorFilter.svelte', () => {
  let component: {};

  beforeEach(() => {
    // Reset mocks before each test
    vi.mocked(state.getColorFilter).mockReturnValue({ type: FilterTypes.Exact });

    // Mount the component
    component = mount(ColorFilter, {
      target: document.body
    });
  });

  afterEach(() => {
    unmount(component);
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
    expect(document.body.querySelector('.color-filter')).not.toBeNull();
  });

  it('should render the filter type button with the correct symbol', () => {
    const filterTypeButton = document.body.querySelector('.filter-type-button');
    expect(filterTypeButton).not.toBeNull();
    
    const symbol = filterTypeButton?.querySelector('.filter-type-symbol');
    expect(symbol?.textContent).toBe('='); // Default is Exact which uses '='
  });

  it('should render color buttons', () => {
    const colorButtons = document.body.querySelectorAll('.color-button');
    expect(colorButtons.length).toBe(6); // 5 colors + colorless
  });

  it('should open filter type panel when filter type button is clicked', async () => {
    const filterTypeButton = document.body.querySelector('.filter-type-button');
    expect(filterTypeButton).not.toBeNull();
    
    // Click the button and flush to ensure state updates are applied
    filterTypeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    flushSync();
    
    // Check if filter type panel is displayed
    const filterTypePanel = document.body.querySelector('.filter-type-panel');
    expect(filterTypePanel).not.toBeNull();
  });

  it('should call changeColorFilterType when a filter type option is clicked', async () => {
    // First open the panel
    const filterTypeButton = document.body.querySelector('.filter-type-button');
    filterTypeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    flushSync();
    
    // Then click a filter type option
    const filterTypeOption = document.body.querySelector('.filter-type-option');
    expect(filterTypeOption).not.toBeNull();
    filterTypeOption?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    flushSync();
    
    // Check if changeColorFilterType was called
    expect(state.changeColorFilterType).toHaveBeenCalled();
  });

  it('should call toggleColor when a color button is clicked', async () => {
    const colorButtons = document.body.querySelectorAll('.color-button');
    expect(colorButtons.length).toBeGreaterThan(0);
    
    // Click the first color button (White)
    colorButtons[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    // Check if toggleColor was called with the correct color
    expect(state.toggleColor).toHaveBeenCalledWith(Colors.White);
  });

  it('should show the correct symbol for Exact filter type', () => {
    // Mock isSelectedFilterType to return true for Exact
    vi.mocked(state.isSelectedFilterType).mockImplementation((type) => type === FilterTypes.Exact);
    
    // Remount the component to reflect the new mock value
    unmount(component);
    component = mount(ColorFilter, {
      target: document.body
    });
    
    const symbol = document.body.querySelector('.filter-type-symbol');
    expect(symbol?.textContent).toBe('=');
  });
  
  it('should show the correct symbol for AtLeast filter type', () => {
    // Mock isSelectedFilterType to return true for AtLeast
    vi.mocked(state.isSelectedFilterType).mockImplementation((type) => type === FilterTypes.AtLeast);
    
    // Remount the component to reflect the new mock value
    unmount(component);
    component = mount(ColorFilter, {
      target: document.body
    });
    
    const symbol = document.body.querySelector('.filter-type-symbol');
    expect(symbol?.textContent).toBe('>=');
  });
  
  it('should show the correct symbol for AtMost filter type', () => {
    // Mock isSelectedFilterType to return true for AtMost
    vi.mocked(state.isSelectedFilterType).mockImplementation((type) => type === FilterTypes.AtMost);
    
    // Remount the component to reflect the new mock value
    unmount(component);
    component = mount(ColorFilter, {
      target: document.body
    });
    
    const symbol = document.body.querySelector('.filter-type-symbol');
    expect(symbol?.textContent).toBe('<=');
  });
});