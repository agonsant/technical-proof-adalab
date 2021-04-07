import { Pokemon, PokemonList } from 'src/model/pokemon';

/**
 * Pokemon Adapter definition. It defines the public methos to retrieve pokemon information
 * @interface IPokemonAdapter the definition of a generic pokemon adapter
 */
export interface IPokemonAdapter {
  /**
   * Retrieves a list with all pokemon information
   * @returns {PokemonList} The list of all pokemon
   * @memberof IPokemonAdapter
   */
  retrieveAllPokemon(): Promise<PokemonList>;

  /**
   * Retrieve the information of a single pokemon specifying its name
   * @param {string} name the pokemon name. Ex: pikachu
   * @returns {Pokemon} A single pokemon detailed information
   * @memberof IPokemonAdapter
   */
  retrievePokemonByName(name: string): Promise<Pokemon | null>;
}
