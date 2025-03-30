export type Colorless = Branded<'C'>;

export const Colorless = 'C' as Colorless;

export type SingleColor = Branded<'W' | 'U' | 'B' | 'R' | 'G'>;

export const Colors = {
  White: 'W' as SingleColor,
  Blue: 'U' as SingleColor,
  Black: 'B' as SingleColor,
  Red: 'R' as SingleColor,
  Green: 'G' as SingleColor,
};

export type Multicolor = {
  readonly colors: [SingleColor, SingleColor, ...SingleColor[]];
}
