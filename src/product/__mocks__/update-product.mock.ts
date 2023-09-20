import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDTO } from '../dto/update-product.dto';

export const updateProductMock: UpdateProductDTO = {
  categoryId: categoryMock.id,
  name: 'teste mock atualizado',
  price: 3000,
  image:
    'https://img.freepik.com/free-psd/premium-mobile-phone-screen-mockup-template_53876-81688.jpg',
};
