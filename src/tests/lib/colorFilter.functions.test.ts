import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  getColorFilter, 
  updateColorFilter, 
  isSelectedValue, 
  isSelectedFilterType 
} from '../../lib/state.svelte';
import { FilterTypes } from '../../lib/colorFilter';
import type { ColorFilter, NoColorFilter } from '../../lib/colorFilter';
import { Colors, Colorless, createMulticolor } from '../../lib/colors';

describe('Color Filter Functions', () => {
  // Save original color filter to restore after tests
  let originalColorFilter: ColorFilter;

  beforeEach(() => {
    // Store original state
    originalColorFilter = getColorFilter();
    
    // Reset color filter to default
    updateColorFilter({ type: FilterTypes.Exact } as NoColorFilter);
  });

  afterEach(() => {
    // Restore original state
    updateColorFilter(originalColorFilter);
  });

  describe('isSelectedValue', () => {
    it('should return false when no color is selected (NoColorFilter)', () => {
      // Start with a NoColorFilter
      updateColorFilter({ type: FilterTypes.Exact } as NoColorFilter);
      
      // Check that no color is selected
      expect(isSelectedValue(Colors.White)).toBe(false);
      expect(isSelectedValue(Colors.Blue)).toBe(false);
      expect(isSelectedValue(Colorless)).toBe(false);
    });

    it('should return true when the exact color is selected (single color)', () => {
      // Set a filter with White
      updateColorFilter({
        type: FilterTypes.Exact,
        value: Colors.White
      });
      
      // Check that White is selected
      expect(isSelectedValue(Colors.White)).toBe(true);
      
      // Check that other colors are not selected
      expect(isSelectedValue(Colors.Blue)).toBe(false);
      expect(isSelectedValue(Colorless)).toBe(false);
    });

    it('should return true when the color is part of a multicolor filter', () => {
      // Create a multicolor filter with White and Blue
      const multicolor = createMulticolor(Colors.White, Colors.Blue);
      updateColorFilter({
        type: FilterTypes.Exact,
        value: multicolor
      });
      
      // Check that White and Blue are selected
      expect(isSelectedValue(Colors.White)).toBe(true);
      expect(isSelectedValue(Colors.Blue)).toBe(true);
      
      // Check that other colors are not selected
      expect(isSelectedValue(Colors.Black)).toBe(false);
      expect(isSelectedValue(Colorless)).toBe(false);
    });

    it('should work with different filter types', () => {
      // Set a filter with White and AtLeast type
      updateColorFilter({
        type: FilterTypes.AtLeast,
        value: Colors.White
      });
      
      // Check that White is selected
      expect(isSelectedValue(Colors.White)).toBe(true);
      
      // Set a filter with Blue and AtMost type
      updateColorFilter({
        type: FilterTypes.AtMost,
        value: Colors.Blue
      });
      
      // Check that Blue is selected
      expect(isSelectedValue(Colors.Blue)).toBe(true);
    });
  });

  describe('isSelectedFilterType', () => {
    it('should return true when the filter type matches', () => {
      // Set Exact filter type
      updateColorFilter({ type: FilterTypes.Exact } as NoColorFilter);
      
      // Check that Exact is selected
      expect(isSelectedFilterType(FilterTypes.Exact)).toBe(true);
      
      // Check that other types are not selected
      expect(isSelectedFilterType(FilterTypes.AtLeast)).toBe(false);
      expect(isSelectedFilterType(FilterTypes.AtMost)).toBe(false);
    });

    it('should return true for the correct filter type with a color value', () => {
      // Set AtLeast filter type with White
      updateColorFilter({
        type: FilterTypes.AtLeast,
        value: Colors.White
      });
      
      // Check that AtLeast is selected
      expect(isSelectedFilterType(FilterTypes.AtLeast)).toBe(true);
      
      // Check that other types are not selected
      expect(isSelectedFilterType(FilterTypes.Exact)).toBe(false);
      expect(isSelectedFilterType(FilterTypes.AtMost)).toBe(false);
    });

    it('should return true for the correct filter type with a multicolor value', () => {
      // Create a multicolor filter with White and Blue
      const multicolor = createMulticolor(Colors.White, Colors.Blue);
      
      // Set AtMost filter type with multicolor
      updateColorFilter({
        type: FilterTypes.AtMost,
        value: multicolor
      });
      
      // Check that AtMost is selected
      expect(isSelectedFilterType(FilterTypes.AtMost)).toBe(true);
      
      // Check that other types are not selected
      expect(isSelectedFilterType(FilterTypes.Exact)).toBe(false);
      expect(isSelectedFilterType(FilterTypes.AtLeast)).toBe(false);
    });

    it('should update when the filter type changes', () => {
      // Start with Exact filter type
      updateColorFilter({ type: FilterTypes.Exact } as NoColorFilter);
      
      // Check that Exact is selected
      expect(isSelectedFilterType(FilterTypes.Exact)).toBe(true);
      
      // Change to AtLeast filter type
      updateColorFilter({ type: FilterTypes.AtLeast } as NoColorFilter);
      
      // Check that AtLeast is now selected
      expect(isSelectedFilterType(FilterTypes.AtLeast)).toBe(true);
      expect(isSelectedFilterType(FilterTypes.Exact)).toBe(false);
    });
  });
});