import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('count')
  async getAllCount() {
    return await this.blogCategoryService.getAllCount();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ) {
    return await this.blogCategoryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createBlogCategoryDto: BlogsCategoriesDto
  ) {
    return await this.blogCategoryService.update(id, createBlogCategoryDto);
  }

  @Delete(':id')
  async removeCategory(
    @Param('id') id: number
  ) {
    return await this.blogCategoryService.removeCategory(id);
  }
}
