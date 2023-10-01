import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { insertCartMock } from '../../cart/__mocks__/insert-cart.mock';
import { cartProductMock } from '../__mocks__/product-cart.mock';
import { NotFoundException } from '@nestjs/common';
import { updateCartMock } from '../../cart/__mocks__/update-cart.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let produtctService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            save: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
        CartProductService,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    produtctService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(produtctService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return delete result after delete product', async () => {
    const deleteResult = await service.deleteProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(deleteResult).toEqual(returnDeleteMock);
  });

  it('should return error in exception delete product', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());

    expect(
      service.deleteProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return cart-product after create', async () => {
    const productCart = await service.createProductInCart(
      insertCartMock,
      cartMock.id,
    );

    expect(productCart).toEqual(cartProductMock);
  });

  it('should return error in exception save product in cart', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createProductInCart(insertCartMock, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return cart-product after verifyed it exists', async () => {
    const productCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(productCart).toEqual(cartProductMock);
  });

  it('should return error when product not found in cart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return error in exception verifyProductInCart', () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in exception verifyProductInCart', () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in exception insertProductInCart', () => {
    jest
      .spyOn(produtctService, 'findProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.insertProductInCartProduct(insertCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist in cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    const cartProduct = await service.insertProductInCartProduct(
      insertCartMock,
      cartMock,
    );
    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(insertCartMock.amount);
  });

  it('should return cart product if not exist in cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.insertProductInCartProduct(
      insertCartMock,
      cartMock,
    );
    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartProductMock,
      amount: cartProductMock.amount + insertCartMock.amount,
    });
  });

  it('should return error in exception updateProductInCartProduct', () => {
    jest
      .spyOn(produtctService, 'findProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.updateProductInCartProduct(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist in cart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updateProductInCartProduct(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist in cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.updateProductInCartProduct(
      updateCartMock,
      cartMock,
    );
    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(updateCartMock.amount);
  });
});
