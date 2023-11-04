import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { insertCartMock } from '../__mocks__/insert-cart.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { updateCartMock } from '../__mocks__/update-cart.mock';

describe('AddressController', () => {
  let controller: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findCartByUserId: jest.fn().mockResolvedValue(cartMock),
            clearCart: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cartService).toBeDefined();
  });

  it('should return cart entity in insertProduct in cart', async () => {
    const cart = await controller.createCart(insertCartMock, userEntityMock.id);

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

  it('should return cart entity in findByUserId', async () => {
    const cart = await controller.findCartByUserId(userEntityMock.id);

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

  it('should return delete result in clearCart', async () => {
    const cart = await controller.clearCart(userEntityMock.id);

    expect(cart).toEqual(returnDeleteMock);
  });

  it('should return cart in updateProductInCart', async () => {
    const cart = await controller.updateProductInCart(
      updateCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });
});
