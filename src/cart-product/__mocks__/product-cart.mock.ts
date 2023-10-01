import { cartMock } from '../../cart/__mocks__/cart.mock';
import { CartProductEntity } from '../entities/cart-product.entity';
import { productMock } from '../../product/__mocks__/product.mock';

export const cartProductMock: CartProductEntity = {
  amount: 45,
  cartId: cartMock.id,
  createdAt: new Date(),
  id: 243,
  productId: productMock.id,
  updatedAts: new Date(),
};
