import { productMock } from '../../product/__mocks__/product.mock';
import { UpdateCartDTO } from '../dto/update-cart.dto';

export const updateCartMock: UpdateCartDTO = {
  amount: 812,
  productId: productMock.id,
};
