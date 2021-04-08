import { ReactElement } from 'react';
import { Pokemon } from './pokemon-card.model';

import Styles from './pokemon-card.module.scss';

/**
 * Card component for a pokemon showing its image, id, name, types and evolves if it has.
 * @param props the pokemon information
 */
const PokemonCard: React.FC<Pokemon> = (props): ReactElement => {
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <img src={props.image_url} alt={`Pokemon card of ${props.name}`} />
        <p className={Styles.identifier}>ID/{props.id}</p>
      </div>
      <div className={Styles.body}>
        <h1 className={Styles.name}>{props.name}</h1>
        {props.types.map((type) => (
          <span key={type} className={Styles.type}>
            {type.toUpperCase()}
          </span>
        ))}
        {props.evolves_from_species && (
          <div className={Styles['evolves-container']}>
            <h2 className={Styles.text}>Evoluciona de:</h2>
            <p className={Styles.specie}>{props.evolves_from_species}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
