import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1, { message: 'Minimo debe ser 1 digito gil' })
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
