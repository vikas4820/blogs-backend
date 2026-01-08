import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BlogTestimonialService } from './blog-testimonial.service';
import { BlogTestimonialDto } from './blog-testimonial.dto';
import { BlogTestimonial } from './blog-testimonial.entity';
import { JwtAuthGuard } from 'src/guards/roles/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('blog-testimonial')
export class BlogTestimonialController {

  constructor(private readonly testimonialService: BlogTestimonialService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async create(@Body() dto: BlogTestimonialDto): Promise<BlogTestimonial> {
    return await this.testimonialService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async findAll(): Promise<BlogTestimonial[]> {
    return await this.testimonialService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async findOne(@Param('id') id: number): Promise<BlogTestimonial> {
    return await this.testimonialService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async update(
    @Param('id') id: number,
    @Body() dto: BlogTestimonialDto,
  ): Promise<BlogTestimonial> {
    return await this.testimonialService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return await this.testimonialService.remove(id);
  }
}
