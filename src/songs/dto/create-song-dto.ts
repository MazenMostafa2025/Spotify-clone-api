import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title;

  @IsString()
  @IsOptional()
  readonly lyrics: string;

  @IsNotEmpty()
  @IsArray()
  // @IsString({ each: true })
  @IsNumber({}, { each: true })
  readonly artists;

  @IsDateString() // "2022-09-29"
  @IsNotEmpty()
  readonly releasedDate: Date;

  @IsMilitaryTime() // "02:34"
  @IsNotEmpty()
  readonly duration: Date;
}
