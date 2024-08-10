import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UserLikeSong } from './user-liked-songs-entity';
import { SongsService } from 'src/songs/songs.service';

@Injectable()
export class userLikedSongsService {
  constructor(
    private usersService: UsersService,
    private songsService: SongsService,
    @InjectRepository(UserLikeSong)
    private userLikesSongsRepository: Repository<UserLikeSong>,
  ) {}

  async likeSong(song_id: number, user_id: number) {
    const user = await this.usersService.findById(user_id);
    const song = await this.songsService.findOne(song_id);
    const data = await this.userLikesSongsRepository.findOne({
      where: {
        user: { id: user.id },
        song: { id: song.id },
      },
    });
    if (data) return await this.userLikesSongsRepository.remove(data);
    const like = await this.userLikesSongsRepository.create({
      user,
      song,
    });
    return await this.userLikesSongsRepository.save(like);
  }
}
