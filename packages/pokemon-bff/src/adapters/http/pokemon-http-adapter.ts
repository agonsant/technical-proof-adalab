import { PokemonList, Pokemon } from '../../model/pokemon';
import { IPokemonAdapter } from '../model/pokemon-adapter';
import fetch, { Response } from 'node-fetch';
import { PokemonHTTPResponse, PokemonHTTPSpecies, PokemonListHTTPResponse } from './models/pokemon-http';
import { generateEmptyPokemonList } from '../../utils/pokemon-utils';

/**
 * Pokemon HTTP Adapter to retrive pokemon information from the API
 * @see https://pokeapi.co/docs/v2
 * @class PokemonHTTPAdapter
 * @implements {IPokemonAdapter}
 */
export class PokemonHTTPAdapter implements IPokemonAdapter {
  private readonly BASE_URL = 'https://pokeapi.co/api';
  private readonly API_VERSION = 'v2';
  private readonly BASE_POKEMON_PATH = '/pokemon';
  private readonly POKEMON_QUERY_LIMIT = 150; // Pokemon Blue and Red
  private readonly POKEMON_QUERY_OFFSET = 0;

  /**
   * Retrieves the whole pokedex from the API requesting pokemon by pokemon
   * @returns {Promise<PokemonList>} the pokemon list from the API
   * @memberof PokemonHTTPAdapter
   */
  async retrieveAllPokemon(): Promise<PokemonList> {
    const url = `${this.BASE_URL}/${this.API_VERSION}/${this.BASE_POKEMON_PATH}?limit=${this.POKEMON_QUERY_LIMIT}&offset=${this.POKEMON_QUERY_OFFSET}`;
    console.log('fetching all pokemon from API');
    return fetch(url)
      .then((res) => this.checkPokemonAPIResponse<PokemonListHTTPResponse>(res))
      .then(this.generatePokemonSettledRequests.bind(this))
      .then(this.generatePokemonListResponse.bind(this))
      .catch(generateEmptyPokemonList);
  }

  /**
   * Retrieves a pokemon by name from the API
   * @param {string} name the pokemon name
   * @returns {(Promise<Pokemon | null>)} a promise that when resolved will be the pokemon instance or null if the request failed
   * @memberof PokemonHTTPAdapter
   */
  retrievePokemonByName(name: string): Promise<Pokemon | null> {
    console.log(`fetching pokemon by name: ${name}`);
    return this.retrievePokemonByURL(`${this.BASE_URL}/${this.API_VERSION}/${this.BASE_POKEMON_PATH}/${name}`);
  }

  /**
   * Retrieves a pokemon from the API URL
   * @param {string} url the API url
   * @returns {(Promise<Pokemon | null>)} a promise that when resolved will be the pokemon instance or null if the request failed
   * @memberof PokemonHTTPAdapter
   */
  private retrievePokemonByURL(url: string): Promise<Pokemon | null> {
    return fetch(url)
      .then((res) => this.checkPokemonAPIResponse<PokemonHTTPResponse>(res))
      .then(this.generatePokemon.bind(this))
      .catch(() => null);
  }

  /**
   * Checks pokemon API response throwing an error if the response is not ok
   * @private
   * @param {Response} res the response from fetch API
   * @returns a promise with the API response in JSON format or null if the response has failed
   * @memberof PokemonHTTPAdapter
   */
  private checkPokemonAPIResponse<T>(res: Response): Promise<T> {
    if (!res.ok) return Promise.reject(null);
    return res.json() as Promise<T>;
  }

  /**
   * Generates de pokemon to response depending on API Response
   * @private
   * @param {(PokemonHTTPResponse | null)} pokemon the API response
   * @returns {(Promise<Pokemon | null>)} null if the pokemon from API is null, the pokemon o.c.
   * @memberof PokemonHTTPAdapter
   */
  private async generatePokemon(pokemon: PokemonHTTPResponse | null): Promise<Pokemon | null> {
    if (!pokemon) return null;
    const pokemonSpecies: PokemonHTTPSpecies = await fetch(this.removeLastSlash(pokemon.species.url)).then((res) =>
      this.checkPokemonAPIResponse<PokemonHTTPSpecies>(res),
    );
    return {
      name: pokemon.name,
      id: pokemon.id,
      types: pokemon.types?.map((type) => type.type.name),
      evolves_from_species: pokemonSpecies.evolves_from_species?.name,
      image_url: pokemon.sprites.front_default,
    };
  }

  /**
   * Creates all pokemon promises requests and unifies them into one settled promise
   * @private
   * @param {PokemonListHTTPResponse} pokemonList the list of available pokemons
   * @returns {(Promise<PromiseSettledResult<Pokemon | null>[]>)}
   * @memberof PokemonHTTPAdapter
   */
  private generatePokemonSettledRequests(pokemonList: PokemonListHTTPResponse): Promise<PromiseSettledResult<Pokemon | null>[]> {
    const pokemonRequests = pokemonList.results.map((e) => this.retrievePokemonByName(e.name + '/'));
    return Promise.allSettled(pokemonRequests);
  }

  /**
   * Generates the whole pokemon list result from all requests
   * @private
   * @param {(PromiseSettledResult<Pokemon | null>[])} pokemonList The result of settled pokemon request
   * @returns {PokemonList} The final pokemon list from the API
   * @memberof PokemonHTTPAdapter
   */
  private generatePokemonListResponse(pokemonList: PromiseSettledResult<Pokemon | null>[]): PokemonList {
    console.log('managing pokemon promises list');
    const pokemonListResult: PokemonList = generateEmptyPokemonList();
    pokemonList.forEach((pokemonPromise) => {
      if (pokemonPromise.status === 'fulfilled' && pokemonPromise.value != null) {
        pokemonListResult.count += 1;
        pokemonListResult.items.push(pokemonPromise.value);
      }
    });
    return pokemonListResult;
  }

  /**
   * Removes last slash from URL if it finished by slash. It is used because some PokeAPI URL gives 404
   * EX:
   *  https://pokeapi.co/api/v2/pokemon/236/
   *  https://pokeapi.co/api/v2/pokemon/364/
   *  https://pokeapi.co/api/v2/pokemon/309/
   *  https://pokeapi.co/api/v2/pokemon-species/561/
   *  https://pokeapi.co/api/v2/pokemon/327/
   * FIXME: Remove this method once pokeAPI bug is fixed.
   * @private
   * @param {string} url
   * @returns {string} the url without last string slash
   * @memberof PokemonHTTPAdapter
   */
  private removeLastSlash(url: string): string {
    return url.lastIndexOf('/') === url.length - 1 ? url.slice(0, -1) : url;
  }
}
