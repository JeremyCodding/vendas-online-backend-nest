import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from '../user/dto/returnUser.dto';
import { LoginPayload } from './dto/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);
    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException(`Email or password are invalid`);
    }

    return {
      accessToken: await this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
