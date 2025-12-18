import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './blog.dto';
import { Blogs } from './blog.entity';

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

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ) {
    return await this.blogService.findOne(id);
  }

  @Post()
  async create(@Body() blogsDto: CreateBlogDto): Promise<Blogs|undefined> {
    return await this.blogService.create(blogsDto);
  }
}
