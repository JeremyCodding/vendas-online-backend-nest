import { ReturnUserDto } from '../../user/dto/returnUser.dto';

export interface ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
