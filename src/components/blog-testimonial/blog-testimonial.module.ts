import { Module } from '@nestjs/common';
import { BlogTestimonialService } from './blog-testimonial.service';
import { BlogTestimonialController } from './blog-testimonial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTestimonial } from './blog-testimonial.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BlogTestimonial
    ])
  ],
  controllers: [BlogTestimonialController],
  providers: [BlogTestimonialService],
})
export class BlogTestimonialModule {}
