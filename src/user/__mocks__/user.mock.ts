import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12345678900',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'ceno@gmail.com',
  id: 234565,
  name: 'Jeremy Pereira',
  phone: '61999999999',
  password: '$2b$10$9oGIXmHn5//WHcigGxXfPuZHmlIlSeGPHT97TWC7nqxDLsdi2VtQa',
  typeUser: UserType.User,
};
