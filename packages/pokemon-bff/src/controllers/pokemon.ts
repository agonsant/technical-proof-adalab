import { Request, Response } from 'express';
import { PokemonDataManager } from '../data-manager/pokemon-data-manager';

/**
 * Manage the express route for requesting all pokemons
 */
export const retrieveAllPokemon = (_req: Request, res: Response): void => {
  console.log('managing request for all pokemon');
  PokemonDataManager.getInstance()
    .retrieveAllPokemon()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

/**
 * Manage the express route for requesting a pokemon by name
 * Sends 404 if the pokemon is not found
 */
export const retrievePokemonByName = (req: Request, res: Response): void => {
  console.log(`managing request for pokemon ${req.params['name']}`);
  PokemonDataManager.getInstance()
    .retrievePokemonByName(req.params['name'] || '')
    .then((pokemon) => {
      if (!pokemon) {
        res.status(404).send('Pokemon no encontrado');
      } else {
        res.json(pokemon);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
