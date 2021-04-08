import { ReactElement, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../component/page-layout';
import PokemonCard from '../../component/pokemon-card';
import { Pokemon } from '../../component/pokemon-card/pokemon-card.model';
import Spinner from '../../component/spinner';
import { retrievePokemonByName } from '../../utils/data-manager';

import Styles from './pokemon-detail.module.scss';

/**
 * Pokemon detail page containing pokemon info
 */
const PokemonDetail: React.FC<unknown> = (): ReactElement => {
  const [state, setState] = useState({
    pokemon: null as Pokemon | null,
    loading: true,
  });
  let { name } = useParams<{ name: string }>();

  /**
   * Hook for request the pokemon info
   */
  useEffect(() => {
    retrievePokemonByName(name).then((pokemon) => {
      setState(() => {
        return {
          pokemon: pokemon,
          loading: false,
        };
      });
    });
  }, [name]);

  return (
    <PageLayout>
      <Link className={Styles.link} to="/">
        Back to the list
      </Link>

      {state.loading ? <Spinner></Spinner> : state.pokemon && <PokemonCard {...state.pokemon}></PokemonCard>}
    </PageLayout>
  );
};

export default PokemonDetail;
