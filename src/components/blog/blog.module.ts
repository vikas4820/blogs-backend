import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blogs } from './blog.entity';
import { Users } from '../user/users.entity';
import { BlogsCategories } from '../blog-category/blog-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Blogs,
      BlogsCategories,
      Users
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService]
})
export class BlogModule {}
