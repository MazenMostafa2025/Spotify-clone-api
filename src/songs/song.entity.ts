import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { UserLikeSong } from 'src/user_liked_songs/user-liked-songs-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'waving ocean',
    description: 'Provide the title of the song',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: '02-01-2022',
    description: 'Provide the release date of the song',
  })
  @Column({ type: 'date' })
  releasedDate: Date;

  @ApiProperty({
    example: '02:25',
    description: 'Provide the duration of the song',
  })
  @Column({ type: 'time' })
  duration: Date;

  @ApiProperty({
    example: 'Shine Bright like a diamond. like a beautiful diamond in the sky',
    description: 'Provide the lyrics of the song',
  })
  @Column({ type: 'text', nullable: true })
  lyrics: string;

  @Column({ type: 'text' })
  audio_file: string;

  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  @ManyToMany(() => Playlist, (playlist) => playlist.songs, { cascade: true })
  @JoinTable({ name: 'songs_playlists' })
  playlists: Playlist[];

  @OneToMany(() => UserLikeSong, (userLikeSong) => userLikeSong.song)
  likedByUsers: UserLikeSong[];
}
