import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ReturnLoginDto } from '../dto/returnLogin.dto';
import { jwtMock } from './jwt.mocks';

export const returnLoginMock: ReturnLoginDto = {
  accessToken: jwtMock,
  user: userEntityMock,
};
