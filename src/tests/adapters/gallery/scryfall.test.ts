import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadGalleryCards } from '../../../adapters/gallery/scryfall.svelte';
import * as state from '../../../lib/state.svelte';
import type { Card } from '../../../lib/types';
import { FilterTypes, type ColorFilter } from '../../../lib/colorFilter';
import { Colors, Colorless } from '../../../lib/colors';
import { createManaValueFilter, ManaValueConditions, type ManaValueFilter } from '../../../lib/manaValueFilter';
import { Formats } from '../../../lib/format';
import type { FormatFilter, SingleFormatFilter, NoFormatFilter } from '../../../lib/formatFilter';

// Mock the state functions
vi.mock('../../../lib/state.svelte', () => ({
  getGalleryCards: vi.fn(() => []),
  updateGalleryCards: vi.fn(),
  getColorFilter: vi.fn(() => ({ type: FilterTypes.Exact })),
  getManaValueFilter: vi.fn(() => createManaValueFilter()),
  getFormatFilter: vi.fn(() => ({ _type: 'NoFormatFilter' } as NoFormatFilter))
}));

// Mock the fetch function
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('Scryfall Gallery Adapter', () => {
  // Sample Scryfall API response
  const mockScryfallResponse = {
    data: [
      {
        id: 'scryfall-id-1',
        name: 'Lightning Bolt',
        mana_cost: '{R}',
        image_uris: {
          normal: 'https://example.com/lightning-bolt.jpg'
        }
      },
      {
        id: 'scryfall-id-2',
        name: 'Counterspell',
        mana_cost: '{U}{U}',
        image_uris: {
          normal: 'https://example.com/counterspell.jpg'
        }
      }
    ],
    has_more: false,
    next_page: null
  };

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup default successful response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockScryfallResponse
    });
  });

  it('should fetch cards from Scryfall API', async () => {
    // Call the adapter function
    await loadGalleryCards({} as any, {} as any, {} as any);
    
    // Verify fetch was called
    expect(mockFetch).toHaveBeenCalled();
    
    // Verify the URL contains the Scryfall search endpoint
    const fetchUrl = mockFetch.mock.calls[0][0];
    expect(fetchUrl).toContain('https://api.scryfall.com/cards/search');
  });

  it('should update gallery cards with transformed Scryfall data', async () => {
    // Call the adapter function
    await loadGalleryCards({} as any, {} as any, {} as any);
    
    // Verify updateGalleryCards was called with the transformed data
    expect(state.updateGalleryCards).toHaveBeenCalled();
    
    // Get the argument passed to updateGalleryCards
    const updateCall = vi.mocked(state.updateGalleryCards).mock.calls[0][0];
    
    // Verify the cards were transformed correctly
    expect(updateCall.length).toBe(2);
    expect(updateCall[0]).toHaveProperty('id', 'scryfall-id-1');
    expect(updateCall[0]).toHaveProperty('name', 'Lightning Bolt');
    expect(updateCall[0]).toHaveProperty('manaCost', '{R}');
    expect(updateCall[0]).toHaveProperty('imageUrl', 'https://example.com/lightning-bolt.jpg');
    
    expect(updateCall[1]).toHaveProperty('id', 'scryfall-id-2');
    expect(updateCall[1]).toHaveProperty('name', 'Counterspell');
    expect(updateCall[1]).toHaveProperty('manaCost', '{U}{U}');
    expect(updateCall[1]).toHaveProperty('imageUrl', 'https://example.com/counterspell.jpg');
  });

  it('should handle API errors gracefully', async () => {
    // Setup error response
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });
    
    // Call the adapter function and expect it to not throw
    await expect(loadGalleryCards({} as any, {} as any, {} as any)).resolves.not.toThrow();
    
    // Verify updateGalleryCards was not called or was called with empty array
    expect(state.updateGalleryCards).not.toHaveBeenCalled();
  });

  it('should construct query with color filter parameters', async () => {
    // Setup a color filter with White and Blue
    const colorFilter = {
      type: FilterTypes.Exact,
      value: { colors: new Set([Colors.White, Colors.Blue]) }
    };
    
    // Mock getColorFilter to return our test filter
    vi.mocked(state.getColorFilter).mockReturnValue(colorFilter);
    
    // Call the adapter function with the mocked filter
    await loadGalleryCards(colorFilter, {} as any, {} as any);
    
    // Verify the query includes color parameters
    const fetchUrl = mockFetch.mock.calls[0][0];
    expect(fetchUrl).toContain('id%3Awu');
  });

  it('should construct query with mana value filter parameters', async () => {
    // Setup a mana value filter with values 2 and 3
    const manaValueFilter = createManaValueFilter(
      ManaValueConditions.EqualToTwo,
      ManaValueConditions.EqualToThree
    );
    
    // Mock getManaValueFilter to return our test filter
    vi.mocked(state.getManaValueFilter).mockReturnValue(manaValueFilter);
    
    // Call the adapter function with the mocked filter
    await loadGalleryCards({} as any, manaValueFilter, {} as any);
    
    // Verify the query includes mana value parameters
    const fetchUrl = mockFetch.mock.calls[0][0];
    expect(fetchUrl).toContain('(cmc%3D2%20OR%20cmc%3D3)');
  });

  it('should construct query with format filter parameters', async () => {
    // Setup a format filter with Standard format
    const formatFilter: SingleFormatFilter = {
      _type: 'SingleFormatFilter',
      format: Formats.Standard
    };
    
    // Mock getFormatFilter to return our test filter
    vi.mocked(state.getFormatFilter).mockReturnValue(formatFilter);
    
    // Call the adapter function with the mocked filter
    await loadGalleryCards({} as any, {} as any, formatFilter);
    
    // Verify the query includes format parameters
    const fetchUrl = mockFetch.mock.calls[0][0];
    expect(fetchUrl).toContain('f%3Astandard');
  });

  it('should handle cards with double-faced layouts', async () => {
    // Setup response with a double-faced card
    const doubleFacedResponse = {
      data: [
        {
          id: 'double-faced-id',
          name: 'Delver of Secrets // Insectile Aberration',
          mana_cost: '{U}',
          card_faces: [
            {
              name: 'Delver of Secrets',
              mana_cost: '{U}',
              image_uris: {
                normal: 'https://example.com/delver-front.jpg'
              }
            },
            {
              name: 'Insectile Aberration',
              mana_cost: '',
              image_uris: {
                normal: 'https://example.com/delver-back.jpg'
              }
            }
          ]
        }
      ],
      has_more: false,
      next_page: null
    };
    
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => doubleFacedResponse
    });
    
    // Call the adapter function
    await loadGalleryCards({} as any, {} as any, {} as any);
    
    // Get the argument passed to updateGalleryCards
    const updateCall = vi.mocked(state.updateGalleryCards).mock.calls[0][0];
    
    // Verify the card was transformed correctly
    expect(updateCall.length).toBe(1);
    expect(updateCall[0]).toHaveProperty('id', 'double-faced-id');
    expect(updateCall[0]).toHaveProperty('name', 'Delver of Secrets // Insectile Aberration');
    expect(updateCall[0]).toHaveProperty('manaCost', '{U}');
    expect(updateCall[0]).toHaveProperty('imageUrl', 'https://example.com/delver-front.jpg');
  });

  it('should only fetch the first page of results', async () => {
    // Setup response with pagination info
    const responseWithPagination = {
      data: [
        {
          id: 'page1-id-1',
          name: 'Card 1',
          mana_cost: '{1}{W}',
          image_uris: {
            normal: 'https://example.com/card1.jpg'
          }
        }
      ],
      has_more: true,
      next_page: 'https://api.scryfall.com/cards/search?page=2&q=...'
    };
    
    // Mock fetch to return the response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => responseWithPagination
    });
    
    // Call the adapter function
    await loadGalleryCards({} as any, {} as any, {} as any);
    
    // Verify fetch was called only once
    expect(mockFetch).toHaveBeenCalledTimes(1);
    
    // Verify the URL includes the page and per_page parameters
    const fetchUrl = mockFetch.mock.calls[0][0];
    expect(fetchUrl).toContain('page=1');
    expect(fetchUrl).toContain('per_page=20');
    
    // Get the argument passed to updateGalleryCards
    const updateCall = vi.mocked(state.updateGalleryCards).mock.calls[0][0];
    
    // Verify only the first page of cards was processed
    expect(updateCall.length).toBe(1);
    expect(updateCall[0]).toHaveProperty('id', 'page1-id-1');
  });

  it('should combine multiple filters in the query', async () => {
    // Setup filters
    const colorFilter = {
      type: FilterTypes.Exact,
      value: Colors.Red
    };
    
    const manaValueFilter = createManaValueFilter(
      ManaValueConditions.EqualToOne
    );
    
    const formatFilter: SingleFormatFilter = {
      _type: 'SingleFormatFilter',
      format: Formats.Modern
    };
    
    // Mock state functions to return our test filters
    vi.mocked(state.getColorFilter).mockReturnValue(colorFilter);
    vi.mocked(state.getManaValueFilter).mockReturnValue(manaValueFilter);
    vi.mocked(state.getFormatFilter).mockReturnValue(formatFilter);
    
    // Call the adapter function with all filters
    await loadGalleryCards(colorFilter, manaValueFilter, formatFilter);
    
    // Verify the query includes all filter parameters
    const fetchUrl = mockFetch.mock.calls[0][0];
    expect(fetchUrl).toContain('id%3Ar');
    expect(fetchUrl).toContain('cmc%3D1');
    expect(fetchUrl).toContain('f%3Amodern');
  });
});