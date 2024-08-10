import {
  Controller,
  Request,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { userLikedSongsService } from './user-liked-songs.service';

@Controller('songs-likes')
@ApiTags('Users Songs Likes')
export class UserSongLikeController {
  constructor(private userLikeSongService: userLikedSongsService) {}
  @ApiOperation({ summary: 'Like or dislike a song' })
  @ApiResponse({ status: 201 })
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  LikeOrUnlikeSong(@Param('id', ParseIntPipe) song_id: number, @Request() req) {
    return this.userLikeSongService.likeSong(song_id, req.user.userId);
  }
}
