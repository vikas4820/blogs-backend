import { Body, Controller, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogsCategoriesDto } from '../blog-category/blog-category.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


}
