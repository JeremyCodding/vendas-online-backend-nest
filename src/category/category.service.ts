import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategory } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty');
    }

    return categories;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category ${name} not found`);
    }

    return category;
  }

  async createCategory(
    createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    const categoryExists = await this.findCategoryByName(
      createCategory.name,
    ).catch(() => undefined);

    if (categoryExists) {
      throw new BadRequestException(
        `Category ${createCategory.name} already exists`,
      );
    }

    return this.categoryRepository.save(createCategory);
  }
}
