/**
 * Pokemon definitions from HTTP API
 * @see https://pokeapi.co/docs/v2
 */

type Type = {
  name: string;
  url: string;
};

type PokemonHTTPSprites = {
  front_default: string;
};

type PokemonHTTPTypes = {
  slot: number;
  type: Type;
};

export type PokemonHTTPSpecies = {
  evolves_from_species: Type;
};

export type PokemonHTTPResponse = {
  id: number;
  name: string;
  sprites: PokemonHTTPSprites;
  types: PokemonHTTPTypes[];
  species: Type;
};

export type PokemonListHTTPResponse = {
  count: number;
  results: Type[];
};
