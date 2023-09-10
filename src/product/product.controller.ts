import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ProductService } from './product.service';
import { ReturnProduct } from './dto/return-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProducts(): Promise<ReturnProduct[]> {
    return (await this.productService.findAllProducts()).map(
      (product) => new ReturnProduct(product),
    );
  }
}
