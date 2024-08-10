import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserLikeSong')
export class UserLikeSong {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.LikedSongs)
  user: User;
  @ManyToOne(() => Song, (song) => song.likedByUsers)
  song: Song;
}
