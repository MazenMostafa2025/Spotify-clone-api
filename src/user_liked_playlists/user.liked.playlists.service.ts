import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikePlaylist } from './user-liked-playlists-entity';
import { UsersService } from 'src/users/users.service';
import { PlaylistsService } from 'src/playlists/playlists.service';

@Injectable()
export class userLikedPlaylistsService {
  constructor(
    private usersService: UsersService,
    private playlistsService: PlaylistsService,
    @InjectRepository(UserLikePlaylist)
    private userLikesPlayListRepository: Repository<UserLikePlaylist>,
  ) {}

  async likeOrUnlikePlaylist(playlist_id: number, user_id: number) {
    const user = await this.usersService.findById(user_id);
    const playlist = await this.playlistsService.findPlaylistById(playlist_id);
    const data = await this.userLikesPlayListRepository.findOne({
      where: {
        user: { id: user.id },
        playlist: { id: playlist.id },
      },
    });
    if (data) return await this.userLikesPlayListRepository.remove(data);
    const like = await this.userLikesPlayListRepository.create({
      user,
      playlist,
    });
    return await this.userLikesPlayListRepository.save(like);
  }
}
