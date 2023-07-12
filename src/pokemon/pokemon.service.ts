import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isNumber } from 'class-validator';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exist in db. ${JSON.stringify(error.keyValue)} `,
        );
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(value: string) {
    let pokemonFound = null;

    if (isNumber(Number(value))) {
      pokemonFound = await this.pokemonModel.findOne({
        no: value,
      });
    }

    if (!pokemonFound && isValidObjectId(value)) {
      pokemonFound = await this.pokemonModel.findOne({
        _id: value,
      });
    }

    if (!pokemonFound) {
      pokemonFound = await this.pokemonModel.findOne({
        name: value,
      });
    }

    console.log({ pokemonFound });
    if (!pokemonFound) {
      throw new NotFoundException(`Not found Pokemon with no ${value}`);
    }

    return pokemonFound;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
