import type { Format } from "./format";

export type NoFormatFilter = {
  readonly _type: 'NoFormatFilter';
};

export type SingleFormatFilter = {
  readonly _type: 'SingleFormatFilter';
  readonly format: Format;
};

export type FormatFilter = NoFormatFilter | SingleFormatFilter;

/**
 * Creates an empty format filter
 * @returns A new empty format filter
 */
export function createEmptyFilter(): NoFormatFilter {
  return { _type: 'NoFormatFilter' };
}

/**
 * Creates a format filter with a single format
 * @param format The format to include in the filter
 * @returns A new format filter with the specified format
 */
export function createSingleFormatFilter(format: Format): SingleFormatFilter {
  return {
    _type: 'SingleFormatFilter',
    format
  };
}

/**
 * Toggles a format in the filter
 * @param filter The current format filter
 * @param format The format to toggle
 * @returns A new format filter with the format toggled
 */
export function toggleFormat(filter: FormatFilter, format: Format): FormatFilter {
  // If the filter already has this format selected, return NoFormatFilter
  if (filter._type === 'SingleFormatFilter' && filter.format === format) {
    return createEmptyFilter();
  }
  
  // Return a filter with the selected format
  return createSingleFormatFilter(format);
}

/**
 * Checks if a format is selected in the filter
 * @param filter The format filter to check
 * @param format The format to check
 * @returns True if the format is selected, false otherwise
 */
export function isFormatSelected(filter: FormatFilter, format: Format): boolean {
  return filter._type === 'SingleFormatFilter' && filter.format === format;
}

/**
 * Checks if any format is selected in the filter
 * @param filter The format filter to check
 * @returns True if any format is selected, false otherwise
 */
export function hasSelectedFormat(filter: FormatFilter): boolean {
  return filter._type === 'SingleFormatFilter';
}

/**
 * Gets the selected format from the filter
 * @param filter The format filter to get the format from
 * @returns The selected format or null if no format is selected
 */
export function getSelectedFormat(filter: FormatFilter): Format | null {
  return filter._type === 'SingleFormatFilter' ? filter.format : null;
}