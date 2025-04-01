import type { Format } from "./format";
import { 
  type FormatFilter, 
  createEmptyFilter,
  createSingleFormatFilter,
  toggleFormat as toggleFormatImpl,
  isFormatSelected as isFormatSelectedImpl,
  hasSelectedFormat as hasSelectedFormatImpl,
  getSelectedFormat as getSelectedFormatImpl
} from "./formatFilter";

// State variables
let formatFilter = $state<FormatFilter>(createEmptyFilter());

/**
 * Gets the current format filter
 * @returns The current format filter
 */
export function getFormatFilter(): FormatFilter {
  return formatFilter;
}

/**
 * Updates the format filter
 * @param filter The new format filter
 */
export function updateFormatFilter(filter: FormatFilter): void {
  formatFilter = filter;
}

/**
 * Toggles a format in the filter
 * @param format The format to toggle
 */
export function toggleFormat(format: Format): void {
  formatFilter = toggleFormatImpl(formatFilter, format);
}

/**
 * Clears the format filter
 */
export function clearFormatFilter(): void {
  formatFilter = createEmptyFilter();
}

/**
 * Checks if a specific format is selected in the filter
 * @param format The format to check
 * @returns True if the format is selected, false otherwise
 */
export function isFormatSelectedInFilter(format: Format): boolean {
  return isFormatSelectedImpl(formatFilter, format);
}

/**
 * Checks if any format is selected in the filter
 * @returns True if any format is selected, false otherwise
 */
export function hasSelectedFormat(): boolean {
  return hasSelectedFormatImpl(formatFilter);
}

/**
 * Sets a specific format in the filter
 * @param format The format to select, or null to clear the filter
 */
export function selectSingleFormat(format: Format | null): void {
  if (format === null) {
    formatFilter = createEmptyFilter();
  } else {
    formatFilter = createSingleFormatFilter(format);
  }
}

/**
 * Gets the currently selected format
 * @returns The selected format or null if no format is selected
 */
export function getSelectedFormatFromFilter(): Format | null {
  return getSelectedFormatImpl(formatFilter);
}