import { Colorless, type Multicolor, type SingleColor, createMulticolor } from "./colors";

export type FilterType = Branded<"Exact" | "AtLeast" | "AtMost">;

export const FilterTypes = {
  Exact: "Exact" as FilterType,
  AtLeast: "AtLeast" as FilterType,
  AtMost: "AtMost" as FilterType,
};

export type NoColorFilter = {
  type: FilterType;
};

export type ColorFilter = NoColorFilter | {
  type: FilterType;
  value: Colorless | SingleColor | Multicolor;
};

export function select(filter: ColorFilter, value: Colorless | SingleColor): ColorFilter {
  // Get the filter type
  const filterType = filter.type;
  
  // If the filter has no value (NoColorFilter), create a new filter with the selected color
  if (!('value' in filter)) {
    return {
      type: filterType,
      value: value
    };
  }
  
  // Get the current filter value
  const currentValue = filter.value;
  
  // If the current value is a single color or colorless
  if (typeof currentValue === 'string') {
    // If selecting the same color, return NoColorFilter of the same type
    if (currentValue === value) {
      return { type: filterType } as NoColorFilter;
    }
    
    // If mixing Colorless with colored mana, replace with the new value
    if (currentValue === Colorless || value === Colorless) {
      return {
        type: filterType,
        value: value
      };
    }
    
    // If selecting a different color, create a multicolor filter
    return {
      type: filterType,
      value: createMulticolor(currentValue as SingleColor, value as SingleColor)
    };
  }
  
  // If the current value is a multicolor
  const multicolor = currentValue as Multicolor;
  const colors = new Set(multicolor.colors);
  
  // If selecting Colorless, replace the filter with Colorless
  if (value === Colorless) {
    return {
      type: filterType,
      value: Colorless
    };
  }
  
  // If the color is already in the set, remove it
  if (colors.has(value as SingleColor)) {
    colors.delete(value as SingleColor);
    
    // If no colors left, return NoColorFilter of the same type
    if (colors.size === 0) {
      return { type: filterType } as NoColorFilter;
    }
    
    // If only one color left, return a single color filter
    if (colors.size === 1) {
      return {
        type: filterType,
        value: Array.from(colors)[0]
      };
    }
    
    // Return a multicolor filter with the updated colors
    return {
      type: filterType,
      value: { colors }
    };
  }
  
  // If the color is not in the set, add it
  colors.add(value as SingleColor);
  
  // Return a multicolor filter with the updated colors
  return {
    type: filterType,
    value: { colors }
  };
}

export function changeType(filter: ColorFilter, newType: FilterType): ColorFilter {
  return {
    ...filter,
    type: newType,
  };
}
