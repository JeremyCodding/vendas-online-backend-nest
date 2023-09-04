import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12345678900',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'teste@gmail.com',
  id: 234565,
  name: 'Jeremy Pereira',
  phone: '61999999999',
  password: 'iajwndajwndaw.oawnjdaoiijdaomwd.aiwjdnajkwidmawiod',
  typeUser: UserType.User,
};
