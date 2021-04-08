import { ReactElement, useEffect, useState } from 'react';
import PageLayout from '../../component/page-layout';
import PokemonGrid from '../../component/pokemon-grid';
import { PokemonList } from '../../component/pokemon-grid/pokemon-grid.model';
import Spinner from '../../component/spinner';
import { retrievePokemonList } from '../../utils/data-manager';

import Styles from './pokedex.module.scss';

/**
 * Pokedex page containing the search and pokemon list
 */
const Pokedex: React.FC<unknown> = (): ReactElement => {
  const [state, setState] = useState({
    initPokemonList: { items: [] } as PokemonList,
    searchPokemonList: { items: [] } as PokemonList,
    loading: true,
  });

  useEffect(() => {
    retrievePokemonList().then((items) => {
      setState(() => {
        return {
          initPokemonList: items,
          searchPokemonList: items,
          loading: false,
        };
      });
    });
  }, []);

  /**
   * Search on the list from search
   * @param query the user input
   */
  const handleInputChange = (query: string) => {
    const updatedSearchList =
      query.length >= 2
        ? { items: state.initPokemonList?.items.filter((e) => new RegExp(query, 'gi').test(e.name)) }
        : state.initPokemonList;
    setState((state) => {
      return {
        ...state,
        searchPokemonList: updatedSearchList,
      };
    });
  };
  return (
    <PageLayout>
      {state.loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <label htmlFor="POKEDEX_SEARCH"></label>
          <input
            id="POKEDEX_SEARCH"
            placeholder="Type to search pokemon..."
            className={Styles.search}
            onChange={(e) => handleInputChange(e.target.value)}
          ></input>
          <PokemonGrid {...state.searchPokemonList}></PokemonGrid>
        </>
      )}
    </PageLayout>
  );
};

export default Pokedex;
