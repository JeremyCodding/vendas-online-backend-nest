import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly userRepository: Repository<StateEntity>,
  ) {}
  async getAllStates(): Promise<StateEntity[]> {
    return this.userRepository.find();
  }
}
