import { PokemonCacheAdapter, PokemonHTTPAdapter, IPokemonAdapter, IPokemonCacheAdapter } from '../adapters';
import { Pokemon, PokemonList } from '../model/pokemon';

/**
 * Facade and Singleton for managing the pokemon data. It manage the pokeAPI and its cache
 * @class PokemonDataManager
 */
export class PokemonDataManager {
  private static _instance: PokemonDataManager;
  private cacheAdapter: IPokemonCacheAdapter;
  private httpAdapter: IPokemonAdapter;

  private constructor() {
    this.cacheAdapter = new PokemonCacheAdapter();
    this.httpAdapter = new PokemonHTTPAdapter();
  }

  /**
   * Retrieves the current instance of the data manager or creates a new one if not has been created before
   * @static
   * @returns {PokemonDataManager}
   * @memberof PokemonDataManager
   */
  static getInstance(): PokemonDataManager {
    if (!PokemonDataManager._instance) {
      PokemonDataManager._instance = new PokemonDataManager();
    }
    return PokemonDataManager._instance;
  }

  /**
   * Retrieves the list of pokemons trying to first hit the cache
   * @returns {Promise<PokemonList>}
   * @memberof PokemonDataManager
   */
  async retrieveAllPokemon(): Promise<PokemonList> {
    let pokemonList = await this.cacheAdapter.retrieveAllPokemon();
    if (pokemonList.count === 0) {
      pokemonList = await this.httpAdapter.retrieveAllPokemon();
      this.cacheAdapter.putPokemonList(pokemonList);
    }
    return pokemonList;
  }

  /**
   * Retrieves a pokemon information trying to first hit the cache
   * @param {string} name the pokemons name
   * @returns {(Promise<Pokemon | null>)}
   * @memberof PokemonDataManager
   */
  async retrievePokemonByName(name: string): Promise<Pokemon | null> {
    let pokemon = await this.cacheAdapter.retrievePokemonByName(name);
    if (pokemon == null) {
      pokemon = await this.httpAdapter.retrievePokemonByName(name);
      if (pokemon != null) this.cacheAdapter.putPokemon(pokemon);
    }
    return pokemon;
  }
}
