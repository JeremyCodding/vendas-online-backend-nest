import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';
import { updatePasswordMock } from '../__mocks__/update-user.mock';

describe('AddressController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue([userEntityMock]),
            createUser: jest.fn().mockResolvedValue(userEntityMock),
            getUserByIdUsingRelations: jest
              .fn()
              .mockResolvedValue(userEntityMock),
            updateUserPassword: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('shoudl return the user in createUser', async () => {
    const user = await controller.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  it('should return all users', async () => {
    const users = await controller.getAllUsers();

    expect(users).toEqual([
      {
        id: userEntityMock.id,
        name: userEntityMock.name,
        email: userEntityMock.email,
        phone: userEntityMock.phone,
        cpf: userEntityMock.cpf,
      },
    ]);
  });

  it('shoudl return user with relations', async () => {
    const user = await controller.getUserById(userEntityMock.id);

    expect(user).toEqual({
      id: userEntityMock.id,
      name: userEntityMock.name,
      email: userEntityMock.email,
      phone: userEntityMock.phone,
      cpf: userEntityMock.cpf,
    });
  });

  it('shoudl return an user entity when password updates', async () => {
    const user = await controller.updateUserPassword(
      userEntityMock.id,
      updatePasswordMock,
    );

    expect(user).toEqual(userEntityMock);
  });
});
