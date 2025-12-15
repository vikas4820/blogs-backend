import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { BlogsCategoriesDto } from './blog-category.dto';
import { BlogsCategories } from './blog-category.entity';

@Controller('blog-category')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}

  @Post()
  async create(@Body() createBlogCategoryDto: BlogsCategoriesDto): Promise<BlogsCategories> {
    return await this.blogCategoryService.create(createBlogCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.blogCategoryService.findAll();
  }
}
