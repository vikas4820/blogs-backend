import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogTestimonialService } from './blog-testimonial.service';
import { BlogTestimonialDto } from './blog-testimonial.dto';
import { BlogTestimonial } from './blog-testimonial.entity';

@Controller('blog-testimonial')
export class BlogTestimonialController {

  constructor(private readonly testimonialService: BlogTestimonialService) {}

  @Post()
  async create(@Body() dto: BlogTestimonialDto): Promise<BlogTestimonial> {
    return await this.testimonialService.create(dto);
  }

  @Get()
  async findAll(): Promise<BlogTestimonial[]> {
    return await this.testimonialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BlogTestimonial> {
    return await this.testimonialService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: BlogTestimonialDto,
  ): Promise<BlogTestimonial> {
    return await this.testimonialService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.testimonialService.remove(id);
  }
}
