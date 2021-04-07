import cache, { CacheClass } from 'memory-cache';
import { PokemonList, Pokemon } from '../../model/pokemon';
import { IPokemonCacheAdapter } from '../model/pokemon-cache-adapter';
import { generateEmptyPokemonList } from '../../utils/pokemon-utils';

/**
 * Cache adapter for storing pokemon into a memory cache
 * @export
 * @class PokemonCacheAdapter
 * @implements {IPokemonCacheAdapter}
 */
export class PokemonCacheAdapter implements IPokemonCacheAdapter {
  private readonly ALL_POKEMON_CACHE_NAME = 'all';
  private individualCacheInstance: CacheClass<string, Pokemon>;
  private allPokemonCacheInstance: CacheClass<string, PokemonList>;

  constructor() {
    this.individualCacheInstance = new cache.Cache<string, Pokemon>();
    this.allPokemonCacheInstance = new cache.Cache<string, PokemonList>();
  }

  /**
   * Retrieve all pokemon list cached
   */
  async retrieveAllPokemon(): Promise<PokemonList> {
    const pokemonList = this.allPokemonCacheInstance.get(this.ALL_POKEMON_CACHE_NAME) || generateEmptyPokemonList();
    return Promise.resolve(pokemonList);
  }

  /**
   * Retrieves the pokemon information from a memory cache
   * @returns {(Pokemon | null)}
   * @memberof PokemonCacheAdapter
   */
  retrievePokemonByName(name: string): Promise<Pokemon | null> {
    return Promise.resolve(this.individualCacheInstance.get(name));
  }

  /**
   * Puts a pokemon into the cache
   * @param {Pokemon} pokemon the pokemon to be stored into the cache
   * @returns {boolean} true
   * @memberof PokemonCacheAdapterImpl
   */
  putPokemon(pokemon: Pokemon): boolean {
    this.individualCacheInstance.put(pokemon.name, pokemon);
    return true;
  }

  /**
   * Stores the pokemon list and all of its pokemon into the cache
   * @param {PokemonList} pokemonList
   * @returns {boolean}
   * @memberof PokemonCacheAdapter
   */
  putPokemonList(pokemonList: PokemonList): boolean {
    this.allPokemonCacheInstance.put(this.ALL_POKEMON_CACHE_NAME, pokemonList);
    pokemonList.items.forEach((p) => this.putPokemon(p));
    return true;
  }
}
