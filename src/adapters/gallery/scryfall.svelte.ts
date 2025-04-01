import { updateGalleryCards, getColorFilter, getManaValueFilter, getFormatFilter } from "../../lib/state.svelte";
import type { Card } from "../../lib/types";
import { FilterTypes, type ColorFilter } from "../../lib/colorFilter";
import { Colors, Colorless, type SingleColor } from "../../lib/colors";
import { ManaValueConditions, type ManaValueFilter } from "../../lib/manaValueFilter";
import type { FormatFilter } from "../../lib/formatFilter";
import type { Format } from "../../lib/format";

/**
 * Loads gallery cards from the Scryfall API based on the current filters
 * @param colorFilter The color filter component
 * @param manaValueFilter The mana value filter component
 * @param formatFilter The format filter component
 */
export async function loadGalleryCards(
  colorFilter?: ColorFilter, 
  manaValueFilter?: ManaValueFilter,
  formatFilter?: FormatFilter
) {
  try {
    // Use the passed filter objects or get them from state if not provided
    const currentColorFilter = colorFilter || getColorFilter();
    const currentManaValueFilter = manaValueFilter || getManaValueFilter();
    const currentFormatFilter = formatFilter || getFormatFilter();
    
    // Build the query string
    let query = "";
    
    // Add color filter to query
    if ('value' in currentColorFilter) {
      const filterType = currentColorFilter.type;
      let colorQuery = "";
      
      // Handle different filter types
      switch (filterType) {
        case FilterTypes.Exact:
          colorQuery = "id:";
          break;
        case FilterTypes.AtLeast:
          colorQuery = "id>=";
          break;
        case FilterTypes.AtMost:
          colorQuery = "id<=";
          break;
      }
      
      // Handle different color values
      const value = currentColorFilter.value;
      
      if (value === Colorless) {
        colorQuery += "c";
      } else if (typeof value === 'string') {
        colorQuery += value.toLowerCase();
      } else {
        // For multicolor, join all colors
        const colors = Array.from(value.colors)
          .map((c: SingleColor) => c.toLowerCase())
          .join("");
        colorQuery += colors;
      }
      
      query += colorQuery;
    }
    
    // Add mana value filter to query
    if (currentManaValueFilter && currentManaValueFilter.conditions && currentManaValueFilter.conditions.size > 0) {
      if (query) query += " ";
      
      // If there are multiple conditions, group them with OR
      if (currentManaValueFilter.conditions.size > 1) {
        query += "(";
      }
      
      const manaValueQueries = Array.from(currentManaValueFilter.conditions)
        .map(condition => {
          if (condition === ManaValueConditions.GreaterThanOrEqualToSeven) {
            return "cmc>=7";
          } else {
            return `cmc=${condition}`;
          }
        })
        .join(" OR ");
      
      query += manaValueQueries;
      
      if (currentManaValueFilter.conditions.size > 1) {
        query += ")";
      }
    }
    
    // Add format filter to query
    if (currentFormatFilter && currentFormatFilter._type === 'SingleFormatFilter') {
      if (query) query += " ";
      
      // Get the format value and convert to lowercase for Scryfall query
      const format = currentFormatFilter.format.toLowerCase();
      
      // Add format to query
      query += `f:${format}`;
    }
    
    // If no filters are applied, use a default query to get some cards
    if (!query) {
      query = "f:standard";
    }
    
    // Fetch cards from Scryfall API
    const cards = await fetchCardsFromScryfall(query);
    
    // Update gallery cards
    updateGalleryCards(cards);
  } catch (error) {
    console.error("Error loading gallery cards from Scryfall:", error);
    // Don't update gallery cards on error
    return; // Explicitly return to prevent further execution
  }
};

/**
 * Fetches cards from the Scryfall API based on a query
 * Only fetches the first page of results (up to 175 cards)
 * @param query The search query
 * @returns An array of Card objects
 */
async function fetchCardsFromScryfall(query: string): Promise<Card[]> {
  // Add page size parameter to limit the number of cards
  const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&page=1&per_page=20`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Scryfall API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Transform Scryfall cards to our Card format
  const transformedCards = data.data.map(transformScryfallCard);
  
  return transformedCards;
}

/**
 * Transforms a Scryfall card to our Card format
 * @param scryfallCard The Scryfall card object
 * @returns A Card object
 */
function transformScryfallCard(scryfallCard: any): Card {
  // Handle double-faced cards
  if (scryfallCard.card_faces && scryfallCard.card_faces.length > 0 && scryfallCard.card_faces[0].image_uris) {
    // Use the front face for the image
    return {
      id: scryfallCard.id,
      name: scryfallCard.name,
      manaCost: scryfallCard.mana_cost || scryfallCard.card_faces[0].mana_cost,
      imageUrl: scryfallCard.card_faces[0].image_uris.normal
    };
  }
  
  // Handle regular cards
  return {
    id: scryfallCard.id,
    name: scryfallCard.name,
    manaCost: scryfallCard.mana_cost,
    imageUrl: scryfallCard.image_uris?.normal
  };
}