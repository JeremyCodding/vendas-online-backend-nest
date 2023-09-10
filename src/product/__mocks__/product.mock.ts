import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  id: 787,
  name: 'Product Mock',
  categoryId: categoryMock.id,
  price: 34.3,
  image: 'http://image.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};
