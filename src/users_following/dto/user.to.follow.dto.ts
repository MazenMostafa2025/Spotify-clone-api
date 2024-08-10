import { IsNumber, IsNotEmpty } from 'class-validator';
export class UserToFollowDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
