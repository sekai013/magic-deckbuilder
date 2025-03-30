import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getColorFilter,
  updateColorFilter,
  toggleColor,
  clearColorFilter,
  changeColorFilterType
} from '../../lib/state.svelte';
import { FilterTypes } from '../../lib/colorFilter';
import type { ColorFilter, NoColorFilter } from '../../lib/colorFilter';
import { Colorless, Colors } from '../../lib/colors';

describe('ColorFilter State', () => {
  // Save original color filter to restore after tests
  let originalColorFilter: ColorFilter;

  beforeEach(() => {
    // Store original state
    originalColorFilter = getColorFilter();
    
    // Reset color filter to default
    clearColorFilter();
  });

  afterEach(() => {
    // Restore original state
    updateColorFilter(originalColorFilter);
  });

  describe('getColorFilter', () => {
    it('should return a ColorFilter object', () => {
      const filter = getColorFilter();
      expect(filter).toBeDefined();
      expect(filter.type).toBeDefined();
    });

    it('should initially be a NoColorFilter with Exact type', () => {
      clearColorFilter();
      const filter = getColorFilter();
      expect(filter).toEqual({ type: FilterTypes.Exact } as NoColorFilter);
      expect('value' in filter).toBe(false);
    });
  });

  describe('updateColorFilter', () => {
    it('should update the color filter state', () => {
      // Create a new filter with a color
      const newFilter: ColorFilter = {
        type: FilterTypes.Exact,
        value: Colors.White
      };
      
      // Update the state
      updateColorFilter(newFilter);
      
      // Check that the state was updated
      const updatedFilter = getColorFilter();
      expect(updatedFilter).toEqual(newFilter);
    });

    it('should handle NoColorFilter', () => {
      // Create a NoColorFilter
      const noFilter: NoColorFilter = { type: FilterTypes.AtLeast };
      
      // Update the state
      updateColorFilter(noFilter);
      
      // Check that the state was updated
      const updatedFilter = getColorFilter();
      expect(updatedFilter).toEqual(noFilter);
    });
  });

  describe('toggleColor', () => {
    it('should add a color when toggling with no filter', () => {
      // Start with a NoColorFilter
      clearColorFilter();
      
      // Toggle a color
      toggleColor(Colors.White);
      
      // Check that the color was added
      const filter = getColorFilter();
      expect('value' in filter).toBe(true);
      expect((filter as any).value).toBe(Colors.White);
    });

    it('should remove a color when toggling the same color', () => {
      // Start with a filter containing White
      updateColorFilter({
        type: FilterTypes.Exact,
        value: Colors.White
      });
      
      // Toggle the same color
      toggleColor(Colors.White);
      
      // Check that the color was removed
      const filter = getColorFilter();
      expect('value' in filter).toBe(false);
    });

    it('should add a second color when toggling a different color', () => {
      // Start with a filter containing White
      updateColorFilter({
        type: FilterTypes.Exact,
        value: Colors.White
      });
      
      // Toggle a different color
      toggleColor(Colors.Blue);
      
      // Check that both colors are in the filter
      const filter = getColorFilter();
      expect('value' in filter).toBe(true);
      
      const multicolorValue = (filter as any).value;
      expect(multicolorValue.colors).toBeDefined();
      expect(multicolorValue.colors.has(Colors.White)).toBe(true);
      expect(multicolorValue.colors.has(Colors.Blue)).toBe(true);
    });

    it('should remove a color from a multicolor filter', () => {
      // Start with a filter containing White and Blue
      const initialFilter: ColorFilter = {
        type: FilterTypes.Exact,
        value: {
          colors: new Set([Colors.White, Colors.Blue])
        }
      };
      updateColorFilter(initialFilter);
      
      // Toggle one of the colors
      toggleColor(Colors.Blue);
      
      // Check that only White remains
      const filter = getColorFilter();
      expect('value' in filter).toBe(true);
      expect((filter as any).value).toBe(Colors.White);
    });

    it('should handle toggling Colorless', () => {
      // Toggle Colorless
      toggleColor(Colorless);
      
      // Check that Colorless was added
      const filter = getColorFilter();
      expect('value' in filter).toBe(true);
      expect((filter as any).value).toBe(Colorless);
    });

    it('should replace colored mana with Colorless when toggling Colorless', () => {
      // Start with a filter containing White
      updateColorFilter({
        type: FilterTypes.Exact,
        value: Colors.White
      });
      
      // Toggle Colorless
      toggleColor(Colorless);
      
      // Check that White was replaced with Colorless
      const filter = getColorFilter();
      expect('value' in filter).toBe(true);
      expect((filter as any).value).toBe(Colorless);
    });

    it('should replace Colorless with colored mana when toggling a color', () => {
      // Start with a filter containing Colorless
      updateColorFilter({
        type: FilterTypes.Exact,
        value: Colorless
      });
      
      // Toggle a color
      toggleColor(Colors.White);
      
      // Check that Colorless was replaced with White
      const filter = getColorFilter();
      expect('value' in filter).toBe(true);
      expect((filter as any).value).toBe(Colors.White);
    });
  });

  describe('clearColorFilter', () => {
    it('should reset the filter to a NoColorFilter with Exact type', () => {
      // Start with a filter containing a color
      updateColorFilter({
        type: FilterTypes.AtLeast,
        value: Colors.White
      });
      
      // Clear the filter
      clearColorFilter();
      
      // Check that the filter was reset
      const filter = getColorFilter();
      expect(filter).toEqual({ type: FilterTypes.Exact } as NoColorFilter);
    });
  });

  describe('changeColorFilterType', () => {
    it('should change the filter type for a NoColorFilter', () => {
      // Start with a NoColorFilter with Exact type
      clearColorFilter();
      
      // Change the filter type
      changeColorFilterType(FilterTypes.AtLeast);
      
      // Check that the filter type was changed
      const filter = getColorFilter();
      expect(filter.type).toBe(FilterTypes.AtLeast);
    });

    it('should change the filter type while preserving the value', () => {
      // Start with a filter containing White
      updateColorFilter({
        type: FilterTypes.Exact,
        value: Colors.White
      });
      
      // Change the filter type
      changeColorFilterType(FilterTypes.AtMost);
      
      // Check that the filter type was changed but the value is preserved
      const filter = getColorFilter();
      expect(filter.type).toBe(FilterTypes.AtMost);
      expect('value' in filter).toBe(true);
      expect((filter as any).value).toBe(Colors.White);
    });

    it('should change the filter type for a multicolor filter', () => {
      // Start with a filter containing White and Blue
      const initialFilter: ColorFilter = {
        type: FilterTypes.Exact,
        value: {
          colors: new Set([Colors.White, Colors.Blue])
        }
      };
      updateColorFilter(initialFilter);
      
      // Change the filter type
      changeColorFilterType(FilterTypes.AtLeast);
      
      // Check that the filter type was changed but the value is preserved
      const filter = getColorFilter();
      expect(filter.type).toBe(FilterTypes.AtLeast);
      expect('value' in filter).toBe(true);
      
      const multicolorValue = (filter as any).value;
      expect(multicolorValue.colors).toBeDefined();
      expect(multicolorValue.colors.has(Colors.White)).toBe(true);
      expect(multicolorValue.colors.has(Colors.Blue)).toBe(true);
    });
  });
});