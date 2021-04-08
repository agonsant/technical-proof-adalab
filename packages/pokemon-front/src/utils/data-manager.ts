/**
 * Returns the pokemon list with its information
 * @returns All the pokemon info
 */
export const retrievePokemonList = () => {
  return fetch('http://localhost:3001/api/v1/pokemon').then((res) => res.json());
};

/**
 * Retrieves the pokemon information from the API introducing its name
 * @param name the pokemon name
 * @returns the pokemin info
 */
export const retrievePokemonByName = (name: string) => {
  return fetch(`http://localhost:3001/api/v1/pokemon/${name}`).then((res) => {
    if (!res.ok) return null;
    return res.json();
  });
};
