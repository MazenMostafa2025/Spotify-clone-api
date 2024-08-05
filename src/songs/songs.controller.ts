import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { ArtistJwtGuard } from 'src/auth/artists-jwt-guard';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  // @Get()
  // findAll(): Promise<Song[]> {
  //   try {
  //     return this.songsService.findAll();
  //   } catch (err) {
  //     throw new HttpException(
  //       'server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       { cause: err },
  //     );
  //   }
  // }
  @Get()
  @ApiOperation({ summary: 'Find All Songs' })
  @ApiResponse({
    status: 200,
    description:
      'It will return all songs with pagination and limiting in the response',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit });
  }
  @Post()
  @ApiOperation({ summary: 'Create a new song' })
  @ApiResponse({
    status: 201,
    description: 'It will return the created song in the response',
  })
  @UseGuards(ArtistJwtGuard)
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find a song by id' })
  @ApiResponse({
    status: 200,
    description: 'It will return the song in the response',
  })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'update a song' })
  @ApiResponse({
    status: 200,
    description: 'It will return the updated data of the song in the response',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }
  @ApiOperation({ summary: 'Delete a song' })
  @ApiResponse({
    status: 204,
    description: 'It will return the user in the response',
  })
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a song' })
  @ApiResponse({
    status: 204,
    description: 'It will return the delete result in the response',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
