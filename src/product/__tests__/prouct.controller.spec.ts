import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('AddressController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAllProducts: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await controller.findAllProducts();

    expect(products).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });

  it('shoudl return a product entity when creating a new product', async () => {
    const product = await controller.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('shoudl return a delete result when deleting a product', async () => {
    const deleteProduct = await controller.deleteProduct(productMock.id);

    expect(deleteProduct).toEqual(returnDeleteMock);
  });

  it('should return product entity when updating a product', async () => {
    const product = await controller.updateProduct(
      updateProductMock,
      productMock.id,
    );

    expect(product).toEqual(productMock);
  });
});
