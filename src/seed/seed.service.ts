import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/AxiosAdapter';
import { HttpClient } from 'src/common/interfaces/httpClient.interface';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<Pokemon>,
    private http: AxiosAdapter,
  ) {}

  async executeSeed() {
    const responseResult = await this.http.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=10`,
    );

    const pokemonListToInsert = responseResult.results.map(
      ({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];

        return { no, name };
        // return { no, name };
      },
    );

    const inserManyResult = await this.pokemonModel.insertMany(
      pokemonListToInsert,
    );
    console.log(inserManyResult);

    return pokemonListToInsert;
  }
  
}
