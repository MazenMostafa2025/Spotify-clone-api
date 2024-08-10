import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User_Following')
export class UserFollowing {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.following)
  follower: User;
  @ManyToOne(() => User, (user) => user.followers)
  following: User;
}
