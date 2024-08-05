import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDTO } from './dto/create-playlist-dto';
import { Playlist } from './playlist.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('playlists')
export class PlaylistsController {
  constructor(private playlistService: PlaylistsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiResponse({
    status: 201,
    description: 'It will return the created playlist in the response',
  })
  create(@Body() createPlaylistDTO: CreatePlaylistDTO): Promise<Playlist> {
    return this.playlistService.create(createPlaylistDTO);
  }
}
