import { ApiProperty } from '@nestjs/swagger';
import { Song } from 'src/songs/song.entity';
import { UserLikePlaylist } from 'src/user_liked_playlists/user-liked-playlists-entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'My Playlist',
    description: 'Provide the name of the playlist',
  })
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.playLists)
  user: User;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];

  @OneToMany(() => UserLikePlaylist, (user_playlist) => user_playlist.playlist)
  likedByUsers: UserLikePlaylist[];
}
