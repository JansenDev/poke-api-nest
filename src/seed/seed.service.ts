import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  BadGatewayException,
  ConflictException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/AxiosAdapter';
import { HttpClient } from 'src/common/interfaces/httpClient.interface';
import { HttpService } from '@nestjs/axios';
import {
  lastValueFrom,
  map,
  catchError,
  retry,
  delay,
  of,
  throwError,
  EMPTY,
  take,
  repeat,
} from 'rxjs';
import { httpPokeResponseToPokemons } from './common/utils';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<Pokemon>,
    // private http: AxiosAdapter,
    private http: HttpService,
  ) {}

  async executeSeed() {
    const pokemonResponse$ = this.http
      .get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=2&offset=10`)
      .pipe(
        map(httpPokeResponseToPokemons),
        // catchError((err) => {
        //   this.logger.error(err.message, err.stack);
        //   return throwError(() => new NotFoundException('ups err'));
        // }),
      );
    try {
      const pokemons = await lastValueFrom(pokemonResponse$);
      const inserManyResult = await this.pokemonModel.insertMany(pokemons);
      this.logger.log({ inserManyResult });

      return pokemons;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error.code === 11_000) {
        throw new ConflictException(error.message);
      }
      throw new BadGatewayException('Error');
    }
  }
}
