import { PokemonType } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse, PokeResult,  } from '../interfaces/poke-response.interface';
import { AxiosResponse } from 'axios';

export const pokemonFormat = ({ name, url }: PokeResult): PokemonType => {
  const segments = url.split('/');
  const no = +segments[segments.length - 2];

  return { name, no };
};

export const pokemonListFormat = (results: PokeResult[]): PokemonType[] => {
  return results.map(pokemonFormat);
};

export const httpPokeResponseToPokemons = (
  pokeResponse: AxiosResponse<PokeResponse>,
) => {
  return pokemonListFormat(pokeResponse.data.results);
};
