/**
 * Basic pokemon type definition.
 */
export type Pokemon = {
  name: string;
  id: number;
  types: string[];
  evolves_from_species: string | null;
  image_url: string;
};
