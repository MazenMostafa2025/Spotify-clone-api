import {
  Param,
  Controller,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpException,
  Request,
  UseGuards,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserFollowingService } from './user-following-service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
@Controller('following')
@ApiTags('following')
export class UserFollowingController {
  constructor(private userFollowingService: UserFollowingService) {}
  @ApiOperation({ summary: 'Follow or unfollow a user' })
  @ApiResponse({ status: 201 })
  @Post('follow')
  @UseGuards(JwtAuthGuard)
  FollowOrUnfollowUser(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.userFollowingService.followOrUnfollowUser(req.user.userId, id);
  }
}
