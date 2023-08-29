import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entitiy';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }
}