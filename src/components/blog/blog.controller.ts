import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
  ) {}

  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @Get('count')
  async getAllCount() {
    return await this.blogService.getAllCount();
  }
}
