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
import { userLikedPlaylistsService } from './user.liked.playlists.service';

@Controller('playlists-likes')
@ApiTags('Users Playlists Likes')
export class UserPlaylistLikeController {
  constructor(private userLikePlaylistService: userLikedPlaylistsService) {}
  @ApiOperation({ summary: 'Like or dislike a playlist' })
  @ApiResponse({ status: 201 })
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  LikeOrUnlikePlaylist(
    @Param('id', ParseIntPipe) playlist_id: number,
    @Request() req,
  ) {
    return this.userLikePlaylistService.likeOrUnlikePlaylist(
      playlist_id,
      req.user.userId,
    );
  }
}
