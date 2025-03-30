import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { flushSync, mount, unmount } from 'svelte';
import * as stateSvelte from '../../lib/state.svelte';
import { ManaValueConditions } from '../../lib/manaValueFilter';
import ManaValueFilter from '../../components/ManaValueFilter.svelte';

describe('ManaValueFilter Component State', () => {
  let component: {};

  beforeEach(() => {
    // Mock the state functions
    vi.mock('../../lib/state.svelte', () => ({
      toggleManaValueCondition: vi.fn(),
      selectAllManaValueConditions: vi.fn(),
      clearAllManaValueConditions: vi.fn(),
      isManaValueConditionSelected: vi.fn(),
      hasSelectedManaValueConditions: vi.fn(),
      getGalleryCards: vi.fn(),
      getDeckCards: vi.fn(),
      updateGalleryCards: vi.fn(),
      updateDeckCards: vi.fn()
    }));

    // Mount our test component (panel is always open)
    component = mount(ManaValueFilter, {
      target: document.body,
    });

    const manaValueButton = document.body.querySelector('.mana-value-button');
    manaValueButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    flushSync();
  });

  afterEach(() => {
    unmount(component);
    component = {};
    vi.clearAllMocks();
  });

  it('should call toggleManaValueCondition when a mana value option is clicked', () => {    
    // Find the mana value options
    const manaValueOption = document.body.querySelector('.mana-value-option');
    
    // Click the first option (which should be 0)
    manaValueOption?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Verify toggleManaValueCondition was called with the correct value
    expect(stateSvelte.toggleManaValueCondition).toHaveBeenCalledTimes(1);
    expect(stateSvelte.toggleManaValueCondition).toHaveBeenCalledWith(ManaValueConditions.EqualToZero);
  });

  it('should call selectAllManaValueConditions when the Select All button is clicked', () => {      
    // Find and click the Select All button
    const selectAllButton = document.body.querySelector('.select-all-button');
    selectAllButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Verify selectAllManaValueConditions was called
    expect(stateSvelte.selectAllManaValueConditions).toHaveBeenCalledTimes(1);
  });

  it('should call clearAllManaValueConditions when the Clear button is clicked', () => {
    // Find and click the Clear button
    const clearButton = document.body.querySelector('.clear-button');
    clearButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Verify clearAllManaValueConditions was called
    expect(stateSvelte.clearAllManaValueConditions).toHaveBeenCalledTimes(1);
  });
});