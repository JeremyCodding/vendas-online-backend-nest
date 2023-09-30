import { CartEntity } from '../entities/cart.entity';
import { ReturnCartProductDTO } from 'src/cart-product/dto/return-cart-product.dto';

export class ReturnCartDTO {
  id: number;
  cartProdut?: ReturnCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProdut = cart.cartProduct
      ? cart.cartProduct.map((product) => new ReturnCartProductDTO(product))
      : undefined;
  }
}
