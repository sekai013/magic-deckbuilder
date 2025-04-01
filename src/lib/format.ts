import type { Branded } from './util';

export type Format = Branded<
  'standard' | 
  'modern' | 
  'legacy' | 
  'vintage' | 
  'commander' | 
  'pauper' | 
  'pioneer' | 
  'historic' | 
  'brawl'
>;

export const Formats = {
  Standard: 'standard' as Format,
  Modern: 'modern' as Format,
  Legacy: 'legacy' as Format,
  Vintage: 'vintage' as Format,
  Commander: 'commander' as Format,
  Pauper: 'pauper' as Format,
  Pioneer: 'pioneer' as Format,
  Historic: 'historic' as Format,
  Brawl: 'brawl' as Format
};