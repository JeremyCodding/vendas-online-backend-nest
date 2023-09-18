import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProduct } from '../dto/create-product.dto';

export const createProductMock: CreateProduct = {
  categoryId: categoryMock.id,
  name: 'teste',
  price: 3000,
  image:
    'https://img.freepik.com/free-psd/premium-mobile-phone-screen-mockup-template_53876-81688.jpg',
};
