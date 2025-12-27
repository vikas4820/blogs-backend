import { Test, TestingModule } from '@nestjs/testing';
import { BlogTestimonialController } from './blog-testimonial.controller';
import { BlogTestimonialService } from './blog-testimonial.service';

describe('BlogTestimonialController', () => {
  let controller: BlogTestimonialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogTestimonialController],
      providers: [BlogTestimonialService],
    }).compile();

    controller = module.get<BlogTestimonialController>(BlogTestimonialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
