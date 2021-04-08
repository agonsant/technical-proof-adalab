import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from '../pokemon-card';
import { PokemonList } from './pokemon-grid.model';

import Styles from './pokemon-grid.module.scss';

/**
 * A grid containing all pokemon from the input list
 * @param props
 */
const PokemonGrid: React.FC<PokemonList> = (props): ReactElement => {
  return (
    <section className={Styles.container}>
      {props.items.map((pokemon) => (
        <Link key={pokemon.id} className={Styles.link} to={`/pokemon/${pokemon.name}`}>
          <PokemonCard {...pokemon}></PokemonCard>
        </Link>
      ))}
    </section>
  );
};

export default PokemonGrid;
