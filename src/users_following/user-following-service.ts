import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UserFollowing } from './user-following.entity';

@Injectable()
export class UserFollowingService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(UserFollowing)
    private userFollowingRepository: Repository<UserFollowing>,
  ) {}

  async followOrUnfollowUser(
    current_user_id: number,
    user_to_be_followed_id: number,
  ) {
    const follower = await this.usersService.findById(current_user_id);
    const following = await this.usersService.findById(user_to_be_followed_id);
    const data = await this.userFollowingRepository.findOne({
      where: {
        follower: { id: follower.id },
        following: { id: following.id },
      },
    });
    if (data) return await this.userFollowingRepository.remove(data);
    const follow = await this.userFollowingRepository.create({
      follower,
      following,
    });
    return await this.userFollowingRepository.save(follow);
  }
}
