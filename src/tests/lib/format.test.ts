import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getSelectedFormat,
  setSelectedFormat,
  clearSelectedFormat,
  isFormatSelected
} from '../../lib/state.svelte';
import { Formats } from '../../lib/format';

describe('Format State', () => {
  // Save original format to restore after tests
  let originalFormat: ReturnType<typeof getSelectedFormat>;

  beforeEach(() => {
    // Store original state
    originalFormat = getSelectedFormat();
    
    // Reset format to null
    clearSelectedFormat();
  });

  afterEach(() => {
    // Restore original state
    setSelectedFormat(originalFormat);
  });

  describe('getSelectedFormat', () => {
    it('should return null initially', () => {
      clearSelectedFormat();
      const format = getSelectedFormat();
      expect(format).toBeNull();
    });
  });

  describe('setSelectedFormat', () => {
    it('should update the selected format', () => {
      // Set a format
      setSelectedFormat(Formats.Standard);
      
      // Check that the format was updated
      const format = getSelectedFormat();
      expect(format).toBe(Formats.Standard);
    });

    it('should handle null', () => {
      // First set a format
      setSelectedFormat(Formats.Modern);
      expect(getSelectedFormat()).toBe(Formats.Modern);
      
      // Then set it to null
      setSelectedFormat(null);
      expect(getSelectedFormat()).toBeNull();
    });
  });

  describe('clearSelectedFormat', () => {
    it('should set the selected format to null', () => {
      // First set a format
      setSelectedFormat(Formats.Commander);
      expect(getSelectedFormat()).toBe(Formats.Commander);
      
      // Then clear it
      clearSelectedFormat();
      expect(getSelectedFormat()).toBeNull();
    });
  });

  describe('isFormatSelected', () => {
    it('should return true when the format is selected', () => {
      // Set a format
      setSelectedFormat(Formats.Legacy);
      
      // Check that the format is selected
      expect(isFormatSelected(Formats.Legacy)).toBe(true);
    });

    it('should return false when the format is not selected', () => {
      // Set a different format
      setSelectedFormat(Formats.Vintage);
      
      // Check that a different format is not selected
      expect(isFormatSelected(Formats.Pauper)).toBe(false);
    });

    it('should return false when no format is selected', () => {
      // Clear the format
      clearSelectedFormat();
      
      // Check that no format is selected
      expect(isFormatSelected(Formats.Pioneer)).toBe(false);
    });
  });
});