import type { Format } from './format';
import { Formats } from './format';

// State variables
let selectedFormat = $state<Format | null>(null);

/**
 * Gets the currently selected format
 * @returns The currently selected format or null if none is selected
 */
export function getSelectedFormat(): Format | null {
  return selectedFormat;
}

/**
 * Sets the selected format
 * @param format The format to select
 */
export function setSelectedFormat(format: Format | null): void {
  selectedFormat = format;
}

/**
 * Clears the selected format
 */
export function clearSelectedFormat(): void {
  selectedFormat = null;
}

/**
 * Checks if a specific format is currently selected
 * @param format The format to check
 * @returns True if the format is selected, false otherwise
 */
export function isFormatSelected(format: Format): boolean {
  return selectedFormat === format;
}