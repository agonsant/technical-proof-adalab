import { Router } from 'express';
import { retrieveAllPokemon, retrievePokemonByName } from '../controllers/pokemon';

const router = Router();

router.get('/pokemon', retrieveAllPokemon);
router.get('/pokemon/:name', retrievePokemonByName);

export { router };
