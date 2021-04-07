/**
 * Basic pokemon type definition. It contains definitions of:
 *
 * - Pokemon: The pokemon itself with all needed info about an individual pokemon
 * - PokemonList: A list of pokemon items
 */

export type Pokemon = {
  name: string;
  id: number;
  types: string[];
  evolves_from_species: string | null;
  image_url: string;
};

export type PokemonList = {
  count: number;
  items: Pokemon[];
};
