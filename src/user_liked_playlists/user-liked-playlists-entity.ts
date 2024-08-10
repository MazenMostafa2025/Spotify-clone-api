import { Playlist } from 'src/playlists/playlist.entity';
import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserLikePlaylist')
export class UserLikePlaylist {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Playlist, (playlist) => playlist.likedByUsers)
  playlist: Playlist;
  @ManyToOne(() => User, (user) => user.likedPlaylists)
  user: User;
}
