import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/user/enum/user-type.enum';

export const ROLES_KEYS = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEYS, roles);
