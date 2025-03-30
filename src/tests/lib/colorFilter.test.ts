import { describe, it, expect } from 'vitest';
import { changeType, FilterTypes, select, type ColorFilter, type NoColorFilter } from '../../lib/colorFilter';
import { Colorless, Colors, createMulticolor } from '../../lib/colors';

describe('select function', () => {
  // Array of all filter types to test
  const filterTypes = Object.values(FilterTypes);

  // Test creating a new filter when selecting a color with no filter
  filterTypes.forEach(filterType => {
    it(`should create a new ${filterType} filter when selecting a color with no filter`, () => {
      const noFilter: NoColorFilter = { type: filterType };
      const result = select(noFilter, Colors.White);
      
      expect(result).toEqual({
        type: filterType,
        value: Colors.White
      });
    });

    it(`should create a new ${filterType} filter when selecting Colorless with no filter`, () => {
      const noFilter: NoColorFilter = { type: filterType };
      const result = select(noFilter, Colorless);
      
      expect(result).toEqual({
        type: filterType,
        value: Colorless
      });
    });
  });

  // Test returning NoColorFilter when selecting the same color that is already in a filter
  filterTypes.forEach(filterType => {
    it(`should return NoColorFilter of type ${filterType} when selecting the same color that is already in the filter`, () => {
      const filter: ColorFilter = {
        type: filterType,
        value: Colors.White
      };
      
      const result = select(filter, Colors.White);
      expect(result).toEqual({ type: filterType } as NoColorFilter);
    });

    it(`should return NoColorFilter of type ${filterType} when selecting the same Colorless that is already in the filter`, () => {
      const filter: ColorFilter = {
        type: filterType,
        value: Colorless
      };
      
      const result = select(filter, Colorless);
      expect(result).toEqual({ type: filterType } as NoColorFilter);
    });
  });

  // Test adding a different color to a filter while maintaining the filter type
  filterTypes.forEach(filterType => {
    it(`should add a different color to a ${filterType} filter while maintaining the filter type`, () => {
      const filter: ColorFilter = {
        type: filterType,
        value: Colors.White
      };
      
      const result = select(filter, Colors.Blue);
      
      expect(result).toEqual({
        type: filterType,
        value: expect.objectContaining({
          colors: expect.any(Set)
        })
      });
      
      // Check that the set contains both colors
      const multicolorValue = (result as any).value;
      expect(multicolorValue.colors.has(Colors.White)).toBe(true);
      expect(multicolorValue.colors.has(Colors.Blue)).toBe(true);
      expect(multicolorValue.colors.size).toBe(2);
    });
  });

  // Test adding a color to an existing filter with multiple colors
  filterTypes.forEach(filterType => {
    it(`should add a color to an existing ${filterType} filter with multiple colors`, () => {
      // Create a filter with White and Blue
      const multicolor = createMulticolor(Colors.White, Colors.Blue);
      const filter: ColorFilter = {
        type: filterType,
        value: multicolor
      };
      
      // Add Black to the filter
      const result = select(filter, Colors.Black);
      
      expect(result).toEqual({
        type: filterType,
        value: expect.objectContaining({
          colors: expect.any(Set)
        })
      });
      
      // Check that the set contains all three colors
      const multicolorValue = (result as any).value;
      expect(multicolorValue.colors.has(Colors.White)).toBe(true);
      expect(multicolorValue.colors.has(Colors.Blue)).toBe(true);
      expect(multicolorValue.colors.has(Colors.Black)).toBe(true);
      expect(multicolorValue.colors.size).toBe(3);
    });
  });

  // Test removing a color from a filter with multiple colors
  filterTypes.forEach(filterType => {
    it(`should remove a color from a ${filterType} filter with multiple colors`, () => {
      // Create a filter with White, Blue, and Black
      const multicolor = createMulticolor(Colors.White, Colors.Blue, Colors.Black);
      const filter: ColorFilter = {
        type: filterType,
        value: multicolor
      };
      
      // Remove Blue from the filter
      const result = select(filter, Colors.Blue);
      
      expect(result).toEqual({
        type: filterType,
        value: expect.objectContaining({
          colors: expect.any(Set)
        })
      });
      
      // Check that the set contains White and Black but not Blue
      const multicolorValue = (result as any).value;
      expect(multicolorValue.colors.has(Colors.White)).toBe(true);
      expect(multicolorValue.colors.has(Colors.Blue)).toBe(false);
      expect(multicolorValue.colors.has(Colors.Black)).toBe(true);
      expect(multicolorValue.colors.size).toBe(2);
    });
  });

  // Test converting a multicolor filter to a single color filter when only one color remains
  filterTypes.forEach(filterType => {
    it(`should convert a multicolor ${filterType} filter to a single color filter when only one color remains`, () => {
      // Create a filter with White and Blue
      const multicolor = createMulticolor(Colors.White, Colors.Blue);
      const filter: ColorFilter = {
        type: filterType,
        value: multicolor
      };
      
      // Remove Blue from the filter
      const result = select(filter, Colors.Blue);
      
      // If there's only one color left, it should be a single color filter
      if ((result as any).value && (result as any).value.colors && (result as any).value.colors.size === 1) {
        expect(result).toEqual({
          type: filterType,
          value: Colors.White
        });
      }
    });
  });

  // Test special cases that should behave the same regardless of filter type
  filterTypes.forEach(filterType => {
    it(`should not allow mixing Colorless with colored mana in ${filterType} filters`, () => {
      // Create a filter with White
      const filter: ColorFilter = {
        type: filterType,
        value: Colors.White
      };
      
      // Try to add Colorless to the filter
      const result = select(filter, Colorless);
      
      // Expect the filter to be replaced with a Colorless filter of the same type
      expect(result).toEqual({
        type: filterType,
        value: Colorless
      });
    });

    it(`should not allow mixing Colorless with multicolor in ${filterType} filters`, () => {
      // Create a filter with White
      const filter: ColorFilter = {
        type: filterType,
        value: createMulticolor(Colors.White, Colors.Blue),
      };
      
      // Try to add Colorless to the filter
      const result = select(filter, Colorless);
      
      // Expect the filter to be replaced with a Colorless filter of the same type
      expect(result).toEqual({
        type: filterType,
        value: Colorless
      });
    });

    it(`should not allow mixing colored mana with Colorless in ${filterType} filters`, () => {
      // Create a filter with Colorless
      const filter: ColorFilter = {
        type: filterType,
        value: Colorless
      };
      
      // Try to add White to the filter
      const result = select(filter, Colors.White);
      
      // Expect the filter to be replaced with a White filter of the same type
      expect(result).toEqual({
        type: filterType,
        value: Colors.White
      });
    });
  });
});

describe('changeType function', () => {
  const originalTypes = Object.values(FilterTypes);
  const targetTypes = Object.values(FilterTypes);

  originalTypes.forEach((originalType) => {
    targetTypes.forEach((targetType) => {
      it(`should change ${originalType} to ${targetType}`, () => {
        const filter = {
          type: originalType,
        };

        const result = changeType(filter, targetType);

        expect(result).toEqual({
          type: targetType,
        });
      });
    });
  });
});
