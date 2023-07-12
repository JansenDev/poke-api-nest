import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, Types, isValidObjectId } from 'mongoose';
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
      this.handleException(error);
    }
  }

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(value: string) {
    let pokemonFound: Pokemon & { _id: Types.ObjectId } = null;

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

  async update(value: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemonFound = await this.findOne(value);

    if (pokemonFound.name)
      pokemonFound.name = pokemonFound.name.toLocaleLowerCase();
    try {
      const result = await this.pokemonModel.updateOne(updatePokemonDto);
      console.log({ result });
      return { ...pokemonFound.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(value: string) {
    const pokemonFound = await this.findOne(value);
    await this.pokemonModel.deleteOne({ _id: pokemonFound._id });
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Duplicate unique field ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException();
  }
}
