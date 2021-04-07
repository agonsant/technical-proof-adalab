import { Pokemon, PokemonList } from '../../model/pokemon';
import { IPokemonAdapter } from './pokemon-adapter';

/**
 * Definition of every pokemon cache adapter
 * @interface IPokemonCacheAdapter
 * @extends {IPokemonAdapter}
 */
export interface IPokemonCacheAdapter extends IPokemonAdapter {
  /**
   * Puts a pokemon to the cache returning true if the element has been put in the cache
   * @param {Pokemon} pokemon
   * @returns {boolean}
   * @memberof IPokemonCacheAdapter
   */
  putPokemon(pokemon: Pokemon): boolean;

  /**
   * Puts a list of pokemon to the cache returning true if the elements has been put in the cache
   * @param {Pokemon} pokemon
   * @returns {boolean}
   * @memberof IPokemonCacheAdapter
   */
  putPokemonList(pokemonList: PokemonList): boolean;
}
