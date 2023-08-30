import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} not found`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const emailFound = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (emailFound) {
      throw new BadRequestException('O email inserido já foi cadastrado');
    }

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: hashPassword,
    });
  }
}
