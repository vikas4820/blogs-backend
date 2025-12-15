import { Module } from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryController } from './blog-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsCategories } from './blog-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BlogsCategories
    ]),
  ],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService],
  exports: [BlogCategoryService]
})
export class BlogCategoryModule {}
