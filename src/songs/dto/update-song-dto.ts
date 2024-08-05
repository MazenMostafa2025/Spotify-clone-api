import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly lyrics: string;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  @IsNumber({}, { each: true })
  readonly artists;

  @IsDateString() // "2022-09-29"
  @IsOptional()
  readonly releasedDate: Date;

  @IsMilitaryTime() // "02:34"
  @IsOptional()
  readonly duration: Date;
}
