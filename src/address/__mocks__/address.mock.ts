import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';

export const addressMock: AddressEntity = {
  id: 123,
  userId: userEntityMock.id,
  complement: 'MockComplement',
  numberAddress: 2,
  cep: '70299-080',
  createdAt: new Date(),
  updatedAt: new Date(),
  cityId: cityMock.id,
};
