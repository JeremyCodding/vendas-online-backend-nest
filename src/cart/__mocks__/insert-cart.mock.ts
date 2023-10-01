import { productMock } from '../../product/__mocks__/product.mock';
import { InserCartDTO } from '../dto/insert-cart.dto';

export const insertCartMock: InserCartDTO = {
  amount: 45,
  productId: productMock.id,
};
