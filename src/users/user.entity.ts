import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/playlist.entity';
import { UserLikePlaylist } from 'src/user_liked_playlists/user-liked-playlists-entity';
import { UserLikeSong } from 'src/user_liked_songs/user-liked-songs-entity';
import { UserFollowing } from 'src/users_following/user-following.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Jane',
    description: 'Provide the first name of the user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'John',
    description: 'Provide the last name of the user',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'jane.john@gmail.com',
    description: 'Provide the email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'ksdg24@%@#!adDNAI',
    description: 'Provide the password of the user',
  })
  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column()
  apiKey: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playLists: Playlist[];

  @OneToMany(() => UserFollowing, (userFollowing) => userFollowing.follower)
  following: UserFollowing[];

  @OneToMany(() => UserFollowing, (userFollowing) => userFollowing.following)
  followers: UserFollowing[];

  @OneToMany(() => UserLikeSong, (userLikeSong) => userLikeSong.user)
  LikedSongs: UserLikeSong[];

  @OneToMany(
    () => UserLikePlaylist,
    (userLikePlaylist) => userLikePlaylist.user,
  )
  likedPlaylists: UserLikePlaylist[];
}
