import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, unmount } from 'svelte';

// Mock the state functions
vi.mock('../../lib/state.svelte', () => ({
  // Color filter functions
  getColorFilter: vi.fn(() => ({ type: 'Exact' })),
  toggleColor: vi.fn(),
  changeColorFilterType: vi.fn(),
  isSelectedValue: vi.fn(() => false),
  isSelectedFilterType: vi.fn(() => false),
  
  // Mana value filter functions
  getManaValueFilter: vi.fn(() => ({ conditions: new Set() })),
  toggleManaValueCondition: vi.fn(),
  selectAllManaValueConditions: vi.fn(),
  clearAllManaValueConditions: vi.fn(),
  isManaValueConditionSelected: vi.fn(() => false),
  hasSelectedManaValueConditions: vi.fn(() => false),
  
  // Format filter functions
  getFormatFilter: vi.fn(() => ({ _type: 'NoFormatFilter' })),
  toggleFormat: vi.fn(),
  selectSingleFormat: vi.fn(),
  isFormatSelectedInFilter: vi.fn(() => false),
  getSelectedFormatFromFilter: vi.fn(() => null)
}));

import Filter from '../../components/Filter.svelte';

describe('Filter.svelte', () => {
  let component: {};

  beforeEach(() => {
    // Mount the component
    component = mount(Filter, {
      target: document.body,
      props: {
        searchText: ''
      }
    });
  });

  afterEach(() => {
    unmount(component);
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
    expect(document.body.querySelector('.filter-container')).not.toBeNull();
  });

  it('should render the filter title', () => {
    const title = document.body.querySelector('.filter-container h3');
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe('Filter Cards');
  });

  it('should include all filter components in the layout', () => {
    const filterLayout = document.body.querySelector('.filter-layout');
    expect(filterLayout).not.toBeNull();
    
    // The filter layout should have 4 children (ColorFilter, ManaValueFilter, FormatFilter, TextFilter)
    expect(filterLayout?.children.length).toBe(4);
  });
});