import { PokemonList } from '../model/pokemon';

/**
 * Creates and returns a new empty pokemon list
 * @returns a list with no pokemon
 */
export const generateEmptyPokemonList = (): PokemonList => {
  return {
    count: 0,
    items: [],
  };
};
