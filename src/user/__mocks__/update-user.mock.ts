import { UpdatePasswordDTO } from '../dto/update-password.dto';

export const updatePasswordMock: UpdatePasswordDTO = {
  lastPassword: 'abc',
  newPassword: 'qualquercoisa',
};

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
  lastPassword: 'qualquercoisa',
  newPassword: 'qualquercoisa',
};
