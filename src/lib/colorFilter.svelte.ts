import { FilterTypes, select as toggle, changeType, type ColorFilter, type NoColorFilter } from "./colorFilter";
import { Colorless, type SingleColor } from "./colors";

// State variables
let colorFilter = $state<ColorFilter>({ type: FilterTypes.Exact } as NoColorFilter);

// Color filter getters and setters
/**
 * Gets the current color filter
 * @returns The current color filter
 */
export function getColorFilter(): ColorFilter {
  return colorFilter;
}

/**
 * Updates the color filter
 * @param filter The new color filter
 */
export function updateColorFilter(filter: ColorFilter): void {
  colorFilter = filter;
}

/**
 * Toggles a color in the filter
 * @param color The color to toggle
 */
export function toggleColor(color: Colorless | SingleColor): void {
  colorFilter = toggle(colorFilter, color);
}

/**
 * Clears the color filter
 */
export function clearColorFilter(): void {
  colorFilter = { type: FilterTypes.Exact } as NoColorFilter;
}

/**
 * Changes the color filter type
 * @param filterType The new filter type
 */
export function changeColorFilterType(filterType: typeof FilterTypes[keyof typeof FilterTypes]): void {
  colorFilter = changeType(colorFilter, filterType);
}

/**
 * Checks if a specific color value is selected in the filter
 * @param value The color value to check
 * @returns True if the color is selected, false otherwise
 */
export function isSelectedValue(value: Colorless | SingleColor): boolean {
  if (!('value' in colorFilter)) {
    return false;
  }

  if (typeof colorFilter.value === 'string') {
    return colorFilter.value === value;
  }

  // For multicolor
  return colorFilter.value.colors && colorFilter.value.colors.has(value as SingleColor);
}

/**
 * Checks if a specific filter type is the current filter type
 * @param filterType The filter type to check
 * @returns True if the filter type is selected, false otherwise
 */
export function isSelectedFilterType(filterType: typeof FilterTypes[keyof typeof FilterTypes]): boolean {
  return colorFilter.type === filterType;
}