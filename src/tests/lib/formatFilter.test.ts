import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getFormatFilter,
  updateFormatFilter,
  toggleFormat,
  clearFormatFilter,
  isFormatSelectedInFilter,
  hasSelectedFormat,
  selectSingleFormat,
  getSelectedFormatFromFilter
} from '../../lib/state.svelte';
import { Formats } from '../../lib/format';
import { type FormatFilter, type NoFormatFilter, type SingleFormatFilter } from '../../lib/formatFilter';

describe('FormatFilter State', () => {
  // Save original format filter to restore after tests
  let originalFormatFilter: FormatFilter;

  beforeEach(() => {
    // Store original state
    originalFormatFilter = getFormatFilter();
    
    // Reset format filter to default
    clearFormatFilter();
  });

  afterEach(() => {
    // Restore original state
    updateFormatFilter(originalFormatFilter);
  });

  describe('getFormatFilter', () => {
    it('should return a FormatFilter object', () => {
      const filter = getFormatFilter();
      expect(filter).toBeDefined();
      expect(filter._type).toBeDefined();
    });

    it('should initially be a NoFormatFilter', () => {
      clearFormatFilter();
      const filter = getFormatFilter();
      expect(filter._type).toBe('NoFormatFilter');
    });
  });

  describe('updateFormatFilter', () => {
    it('should update the format filter state', () => {
      // Create a new filter with a format
      const newFilter: SingleFormatFilter = {
        _type: 'SingleFormatFilter',
        format: Formats.Standard
      };
      
      // Update the state
      updateFormatFilter(newFilter);
      
      // Check that the state was updated
      const updatedFilter = getFormatFilter();
      expect(updatedFilter).toEqual(newFilter);
    });

    it('should handle NoFormatFilter', () => {
      // Create a NoFormatFilter
      const noFilter: NoFormatFilter = { _type: 'NoFormatFilter' };
      
      // Update the state
      updateFormatFilter(noFilter);
      
      // Check that the state was updated
      const updatedFilter = getFormatFilter();
      expect(updatedFilter).toEqual(noFilter);
    });
  });

  describe('toggleFormat', () => {
    it('should add a format when toggling with no filter', () => {
      // Start with a NoFormatFilter
      clearFormatFilter();
      
      // Toggle a format
      toggleFormat(Formats.Standard);
      
      // Check that the format was added
      const filter = getFormatFilter();
      expect(filter._type).toBe('SingleFormatFilter');
      expect((filter as SingleFormatFilter).format).toBe(Formats.Standard);
    });

    it('should remove a format when toggling the same format', () => {
      // Start with a filter containing Standard
      selectSingleFormat(Formats.Standard);
      
      // Toggle the same format
      toggleFormat(Formats.Standard);
      
      // Check that the format was removed
      const filter = getFormatFilter();
      expect(filter._type).toBe('NoFormatFilter');
    });

    it('should replace the format when toggling a different format', () => {
      // Start with a filter containing Standard
      selectSingleFormat(Formats.Standard);
      
      // Toggle a different format
      toggleFormat(Formats.Modern);
      
      // Check that the format was replaced
      const filter = getFormatFilter();
      expect(filter._type).toBe('SingleFormatFilter');
      expect((filter as SingleFormatFilter).format).toBe(Formats.Modern);
    });
  });

  describe('clearFormatFilter', () => {
    it('should reset the filter to a NoFormatFilter', () => {
      // Start with a filter containing a format
      selectSingleFormat(Formats.Standard);
      
      // Clear the filter
      clearFormatFilter();
      
      // Check that the filter was reset
      const filter = getFormatFilter();
      expect(filter._type).toBe('NoFormatFilter');
    });
  });

  describe('isFormatSelectedInFilter', () => {
    it('should return true when the format is selected', () => {
      // Start with a filter containing Standard
      selectSingleFormat(Formats.Standard);
      
      // Check that Standard is selected
      expect(isFormatSelectedInFilter(Formats.Standard)).toBe(true);
      
      // Check that Modern is not selected
      expect(isFormatSelectedInFilter(Formats.Modern)).toBe(false);
    });

    it('should return false when no formats are selected', () => {
      // Start with a NoFormatFilter
      clearFormatFilter();
      
      // Check that no formats are selected
      expect(isFormatSelectedInFilter(Formats.Standard)).toBe(false);
    });
  });

  describe('hasSelectedFormat', () => {
    it('should return true when a format is selected', () => {
      // Start with a filter containing Standard
      selectSingleFormat(Formats.Standard);
      
      // Check that there is a selected format
      expect(hasSelectedFormat()).toBe(true);
    });

    it('should return false when no format is selected', () => {
      // Start with a NoFormatFilter
      clearFormatFilter();
      
      // Check that there is no selected format
      expect(hasSelectedFormat()).toBe(false);
    });
  });

  describe('selectSingleFormat', () => {
    it('should select the specified format', () => {
      // Select Standard
      selectSingleFormat(Formats.Standard);
      
      // Check that Standard is selected
      expect(isFormatSelectedInFilter(Formats.Standard)).toBe(true);
      
      // Check that other formats are not selected
      expect(isFormatSelectedInFilter(Formats.Modern)).toBe(false);
    });

    it('should replace previously selected format', () => {
      // First select Standard
      selectSingleFormat(Formats.Standard);
      
      // Then select Modern
      selectSingleFormat(Formats.Modern);
      
      // Check that only Modern is selected
      expect(isFormatSelectedInFilter(Formats.Standard)).toBe(false);
      expect(isFormatSelectedInFilter(Formats.Modern)).toBe(true);
    });

    it('should create a NoFormatFilter when null is specified', () => {
      // First select Standard
      selectSingleFormat(Formats.Standard);
      
      // Then select null
      selectSingleFormat(null);
      
      // Check that no format is selected
      expect(hasSelectedFormat()).toBe(false);
    });
  });

  describe('getSelectedFormatFromFilter', () => {
    it('should return the selected format', () => {
      // Select Standard
      selectSingleFormat(Formats.Standard);
      
      // Check that Standard is returned
      expect(getSelectedFormatFromFilter()).toBe(Formats.Standard);
    });

    it('should return null when no format is selected', () => {
      // Start with a NoFormatFilter
      clearFormatFilter();
      
      // Check that null is returned
      expect(getSelectedFormatFromFilter()).toBeNull();
    });
  });
});