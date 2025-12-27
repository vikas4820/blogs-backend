import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogTestimonial } from './blog-testimonial.entity';
import { BlogTestimonialDto } from './blog-testimonial.dto';

@Injectable()
export class BlogTestimonialService {

  constructor(
    @InjectRepository(BlogTestimonial)
    private testimonialRepository: Repository<BlogTestimonial>,
  ) {}

  async create(dto: BlogTestimonialDto): Promise<BlogTestimonial> {
    try {
      const testimonial = this.testimonialRepository.create(dto);
      return await this.testimonialRepository.save(testimonial);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<BlogTestimonial[]> {
    try {
      return await this.testimonialRepository.find({
        order: { sortOrder: 'ASC' },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<BlogTestimonial> {
    try {
      const testimonial = await this.testimonialRepository.findOne({ where: { id } });

      if (!testimonial) {
        throw new HttpException('Testimonial not found', HttpStatus.NOT_FOUND);
      }

      return testimonial;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, dto: BlogTestimonialDto): Promise<BlogTestimonial> {
    try {
      const testimonial = await this.findOne(id);
      Object.assign(testimonial, dto);
      return await this.testimonialRepository.save(testimonial);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<{ status: boolean }> {
    try {
      const testimonial = await this.findOne(id);
      await this.testimonialRepository.remove(testimonial);
      return { status: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
