import { updateGalleryCards, getColorFilter, getManaValueFilter } from "../../lib/state.svelte";
import type { Card } from "../../lib/types";
import { FilterTypes, type ColorFilter } from "../../lib/colorFilter";
import { Colors, Colorless } from "../../lib/colors";
import { ManaValueConditions, type ManaValueFilter } from "../../lib/manaValueFilter";

/**
 * Loads gallery cards from the Scryfall API based on the current filters
 * @param colorFilter The color filter component
 * @param manaValueFilter The mana value filter component
 */
export async function loadGalleryCards(colorFilter: ColorFilter, manaValueFilter: ManaValueFilter) {
  try {
    // Get current filter states
    const currentColorFilter = getColorFilter();
    const currentManaValueFilter = getManaValueFilter();
    
    // Build the query string
    let query = "";
    
    // Add color filter to query
    if ('value' in currentColorFilter) {
      const filterType = currentColorFilter.type;
      let colorQuery = "";
      
      // Handle different filter types
      switch (filterType) {
        case FilterTypes.Exact:
          colorQuery = "c:exactly ";
          break;
        case FilterTypes.AtLeast:
          colorQuery = "c>= ";
          break;
        case FilterTypes.AtMost:
          colorQuery = "c<= ";
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
          .map(c => c.toLowerCase())
          .join("");
        colorQuery += colors;
      }
      
      query += colorQuery;
    }
    
    // Add mana value filter to query
    if (currentManaValueFilter.conditions.size > 0) {
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
            return `cmc:${condition}`;
          }
        })
        .join(" OR ");
      
      query += manaValueQueries;
      
      if (currentManaValueFilter.conditions.size > 1) {
        query += ")";
      }
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