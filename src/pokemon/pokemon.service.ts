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
import { PaginationDto } from 'src/common/interfaces/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  paginationLimitDefault: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.paginationLimitDefault = +this.configService.getOrThrow<number>(
      'CONSTANTS.PAGINATION.LIMIT',
    );
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll({
    limit = this.paginationLimitDefault,
    offset = 0,
  }: PaginationDto) {
    return await this.pokemonModel.find().skip(offset).limit(limit).sort({
      no: 1,
    });
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

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0) {
      throw new NotFoundException(`Not Found Pokemon with id ${id}`);
    }
    return;
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
