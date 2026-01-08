import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/guards/roles/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @UseGuards(JwtAuthGuard) 
  @Roles('admin', 'user')
  async findAll(
    @Req() req: any, 
    @Query('page') page = 1, 
    @Query('limit') limit = 5
  ) {
    const { roles, userId } = req.user;
    return await this.blogService.findAll(roles, userId, +page, +limit);
  }

  @Get('public-blogs')
  async findAllPublic(
    @Req() req: any, 
    @Query('page') page = 1, 
    @Query('limit') limit = 5
  ) {
    return await this.blogService.findAllPublic(+page, +limit);
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'user')
  async getAllCount(@Req() req: any) {
    const { roles, userId } = req.user;
    return await this.blogService.getAllCount(roles, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.blogService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'user')
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @Body() dto: CreateBlogDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.blogService.create(dto, files);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'user')
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      storage: multer.memoryStorage(),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBlogDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.blogService.update(id, dto, images);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    const result = await this.blogService.delete(id);
    return result;
  }
}
